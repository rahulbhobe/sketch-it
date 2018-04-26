import request from 'request';
import {promisify} from 'es6-promisify';


class RequestUtils {
  static getRequest (route, payload) {
    return promisify(request)({url: window.location.origin + route, qs: payload}).then((httpResponse) => {
      return JSON.parse(httpResponse.body);
    });
  };

  static postRequest (route, payload) {
    return promisify(request.post)({url: window.location.origin + route, json: payload}).then((httpResponse) => {
      return httpResponse.body;
    });
  };
};

export default RequestUtils;