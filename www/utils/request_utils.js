import request from 'request';
import isUrl from 'is-url';
import {promisify} from 'es6-promisify';


class RequestUtils {
  static getRequest (route, payload) {
    let url = isUrl(route) ? route : window.location.origin + route;
    return promisify(request)({url, qs: payload}).then((httpResponse) => {
      return JSON.parse(httpResponse.body);
    });
  };

  static postRequest (route, payload) {
    let url = isUrl(route) ? route : window.location.origin + route;
    return promisify(request.post)({url, json: payload}).then((httpResponse) => {
      return httpResponse.body;
    });
  };
};

export default RequestUtils;