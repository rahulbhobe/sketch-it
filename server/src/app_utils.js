
class AppUtils {
  static _data = [];

  static addJobDetails (fileId) {
    this._data.push({workitemId: '', fileId, thumbnail: ''});
  }

  static getFileId (workitemId) {
    let data = this._data.find(d => d.workitemId === workitemId);
    return data.fileId;
  }

  static getThumbnail (fileId) {
    let data = this._data.find(d => d.fileId === fileId);
    return data.thumbnail;
  }

  static setThumbnail (fileId, thumbnail) {
    let data = this._data.find(d => d.fileId === fileId);
    data.thumbnail = thumbnail;
  }

  static setWorkitemId (fileId, workitemId) {
    let data = this._data.find(d => d.fileId === fileId);
    data.workitemId = workitemId;
  }
};

export default AppUtils;
