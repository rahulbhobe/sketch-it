import ngrok from 'ngrok';
import request from 'request';
import base64 from 'base-64';
import {promisify} from 'es6-promisify';

class NgrokUtils {
  static _url = null;

  static init (port) {
    ngrok.connect(port).then(url => {
      this._url = url;
      console.log(url);
    });
  };
};

export default NgrokUtils;
