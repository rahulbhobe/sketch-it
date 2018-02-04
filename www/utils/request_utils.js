import request from 'request';
import promisify from 'es6-promisify';


class RequestUtils {
  static postRequest (route, payload) {
    return promisify(request.post)(window.location.origin + route, {form: payload}).then((httpResponse) => {
      return JSON.parse(httpResponse.body);
    });
  };

  static getAllSavedData () {
    let payload = {type: 'all'};
    return this.postRequest('/data', payload);
  };

  static getSavedDataForUrl (url) {
    let payload = {type: 'one', url};
    return this.postRequest('/data', payload);
  };

  static saveToDataBase (type, data) {
    let payload = {type, ...data};
    return this.postRequest('/link', payload);
  };
};

export default RequestUtils;