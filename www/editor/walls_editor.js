import Editor from './editor';

class WallsEditor extends Editor {
  proccessNewPoint (point) {
    console.log(point);
    this.pushPoint(point);
  };

  finishEditor () {
    console.log(this.getPoints());
  };
};

export default WallsEditor;
