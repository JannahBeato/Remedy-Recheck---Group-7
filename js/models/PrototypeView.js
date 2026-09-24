(function registerPrototypeView(global) {
const { models } = global.RemedyRecheck;

models.PrototypeView = class PrototypeView {
  constructor({ id, title }) {
    if (!id) throw new TypeError("PrototypeView requires an id.");
    this.id = id;
    this.title = title;
    Object.freeze(this);
  }
};
})(window);
