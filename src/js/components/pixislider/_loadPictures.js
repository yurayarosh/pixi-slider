import * as PIXI from 'pixi.js';

export default function _loadPictures() {
  const loader = new PIXI.Loader();
  this.slidesData.images.forEach((item) => loader.add(item));
  loader.onComplete.add(this._render.bind(this));
  loader.load();
}
