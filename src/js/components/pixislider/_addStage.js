import * as PIXI from 'pixi.js';

export default function _addStage() {
  const { width, height } = this.size;
  this.canvas = new PIXI.Application({
    width,
    height,
    transparent: true,
  });
  this.canvas.renderer.autoResize = true;

  if (this.wrapper.children.length > 0) {
    this.wrapper.insertBefore(this.canvas.view, this.wrapper.firstChild);
  } else {
    this.wrapper.appendChild(this.canvas.view);
  }

  this.canvas.view.style.display = 'block';
}
