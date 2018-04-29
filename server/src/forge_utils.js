import ForgeSDK from 'forge-apis';
import request from 'request';
import base64 from 'base-64';
import {promisify} from 'es6-promisify';

class ForgeUtils {
  static DAS_URL          = 'https://developer.api.autodesk.com/da/us-east/v3';
  static CLIENT_ID        = process.env.CLIENT_ID || '';
  static CLIENT_SECRET    = process.env.CLIENT_SECRET || '';
  static AUTH_SCOPE       = ['data:write', 'data:create', 'data:read', 'bucket:read', 'bucket:update', 'bucket:create', 'bucket:delete', 'code:all'];
  static BUCKET_KEY       = 'sketchit_testing';
  static POLLING_DELAY    = 5000;
  static _oAuth2TwoLegged = null;

  static init () {
    this._oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(this.CLIENT_ID, this.CLIENT_SECRET, this.AUTH_SCOPE, true);
    return this._oAuth2TwoLegged.authenticate().then(cr => {
      return this.getOrCreateBucket();
    }).then(bucketKey => {
      if (bucketKey !== this.BUCKET_KEY) {
        throw new Error('Could not find or create bucket!');
      }
    }).catch(err => {
      console.error(err);
    });
  };

  static delay (ms) {
    return new Promise(_ => setTimeout(_, ms || this.POLLING_DELAY));
  };

  static getOrCreateBucket () {
    let BucketsApi = new ForgeSDK.BucketsApi();
    let bucketKey = this.BUCKET_KEY;

    return BucketsApi.getBucketDetails(bucketKey, null, this._oAuth2TwoLegged.getCredentials()).catch(err => {
      let policyKey = 'temporary';
      return BucketsApi.createBucket({bucketKey, policyKey}, {}, null, this._oAuth2TwoLegged.getCredentials());
    }).then(({body:{bucketKey}}) => {
      return bucketKey;
    });
  };

  static createSignedResource (objectName) {
    let ObjectsApi = new ForgeSDK.ObjectsApi();
    let bucketKey = this.BUCKET_KEY;
    return ObjectsApi.uploadObject(bucketKey, objectName, 0, '', {}, null, this._oAuth2TwoLegged.getCredentials()).then(res => {
      return ObjectsApi.createSignedResource(bucketKey, objectName, {}, {access: 'write'}, null, this._oAuth2TwoLegged.getCredentials());
    }).then(({body:{signedUrl}}) => {
      return signedUrl;
    });
  };

  static translate (objectName) {
    let DerivativesApi = new ForgeSDK.DerivativesApi();
    let urn = base64.encode('urn:adsk.objects:os.object:' + this.BUCKET_KEY + '/' + objectName);
    let input = {urn};
    let output = {
      formats: [
        {
          type: 'svf',
          views: ['2d', '3d']
        }
      ]
    };
    return DerivativesApi.translate({input, output}, {}, null, this._oAuth2TwoLegged.getCredentials());
  };

  static getDerivatives (objectName) {
    let DerivativesApi = new ForgeSDK.DerivativesApi();
    let urn = base64.encode('urn:adsk.objects:os.object:' + this.BUCKET_KEY + '/' + objectName);
    return DerivativesApi.getManifest(urn, {}, null, this._oAuth2TwoLegged.getCredentials())
                         .then(({body:{status}}) => status);
  };

  static getDerivativesLoop (objectName) {
    return this.getDerivatives(objectName).then(status => {
      if (status!=='pending'&&status!=='inprogress') {
        return Promise.resolve(status);
      }
      return this.delay().then(_ => this.getDerivativesLoop(objectName));
    });
  };

  static getThumbnail (objectName) {
    let DerivativesApi = new ForgeSDK.DerivativesApi();
    let urn = base64.encode('urn:adsk.objects:os.object:' + this.BUCKET_KEY + '/' + objectName);
    return DerivativesApi.getThumbnail(urn, {}, null, this._oAuth2TwoLegged.getCredentials())
                         .then(({body}) => new Buffer(body).toString('base64'));
  };

  static postWorkitem(payload) {
    let params = {
      url: this.DAS_URL + '/workitems',
      headers: {
        Authorization: 'Bearer ' + this._oAuth2TwoLegged.getCredentials().access_token,
      },
      json: payload
    }
    return promisify(request.post)(params).then(({body:{id}}) => id);
  };

  static getWorkitemStatus (id) {
    let params = {
      url: this.DAS_URL + '/workitems/' + id,
      headers: {
        'Authorization': 'Bearer ' + this._oAuth2TwoLegged.getCredentials().access_token,
      }
    };
    return promisify(request)(params).then(({body}) => JSON.parse(body).status);
  };

  static getWorkitemStatusLoop (id) {
    return this.getWorkitemStatus(id).then(status => {
      if (status!=='pending'&&status!=='inprogress') {
        return Promise.resolve(status);
      }
      return this.delay().then(_ => this.getWorkitemStatusLoop(id));
    });
  };
};

export default ForgeUtils;
