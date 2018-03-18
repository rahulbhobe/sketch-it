import Wall from '../elements/wall';
import ArrayUtils from './array_utils';

class ElementUtils {
  static generateWallsFromPoints (points) {
    let length = points.length;
    if (length <= 1) return [];
    return ArrayUtils.range(length-1).map(idx => new Wall(points[idx], points[idx+1]));
  };

  static generateFloorsFromPoints (points) {
    throw new Error('The function generateFloorsFromPoints() is not implemented.');
    return [];
  };
};

export default ElementUtils;
