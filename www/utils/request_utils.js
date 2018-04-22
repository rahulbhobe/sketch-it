import request from 'request';
import {promisify} from 'es6-promisify';


class RequestUtils {
  static postRequest (route, payload) {
    return promisify(request.post)(window.location.origin + route, {form: payload}).then((httpResponse) => {
      return JSON.parse(httpResponse.body);
    });
  };
};

export default RequestUtils;