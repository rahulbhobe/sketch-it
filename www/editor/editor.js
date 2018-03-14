class Editor {
  constructor () {
    this._points = [];
  };

  getPoints () {
    return this._points;
  };

  pushPoint (point) {
    this._points.push(point);
  };

  proccessNewPoint (point) {
    throw new Error('The function proccessNewPoint() not implemented.');
  };

  finishEditor () {
    throw new Error('The function finishEditor() not implemented.');
  };
};

export default Editor;
