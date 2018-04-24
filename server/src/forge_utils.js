import ForgeSDK from 'forge-apis';

class ForgeUtils {
  static CLIENT_ID        = process.env.CLIENT_ID || '';
  static CLIENT_SECRET    = process.env.CLIENT_SECRET || '';
  static AUTH_SCOPE       = ['data:write', 'data:read', 'bucket:read', 'bucket:update', 'bucket:create', 'bucket:delete'];
  static BUCKET_KEY       = 'sketchit_testing';
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

  static getOrCreateBucket () {
    let BucketsApi = new ForgeSDK.BucketsApi();
    let bucketKey = this.BUCKET_KEY;

    return BucketsApi.getBucketDetails(bucketKey, this._oAuth2TwoLegged, this._oAuth2TwoLegged.getCredentials()).catch(err => {
      let policyKey = 'temporary';
      return BucketsApi.createBucket({bucketKey, policyKey}, {}, this._oAuth2TwoLegged, this._oAuth2TwoLegged.getCredentials());
    }).then(obj => {
      return obj.body.bucketKey;
    });
  };
};

export default ForgeUtils;

