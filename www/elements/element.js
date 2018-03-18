class Element {
  render (temp) {
    throw new Error('The function render() not implemented.');
  };

  getType () {
    return this.type;
  };

  getKey (temp, idx) {
    let prefix = temp ? 'temp' : 'doc';
    return prefix + '_' + this.getType() + '_' + idx;
  };
};

export default Element;