import ngrok from 'ngrok';

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
