import * as PIXI from 'pixi.js';

export default function _addStage() {
  const { width, height } = this.size;
  this.canvas = new PIXI.Application({
    width,
    height,
    transparent: true,
  });
  this.canvas.renderer.autoResize = true;

  if (this.container.children.length > 0) {
    this.container.insertBefore(this.canvas.view, this.container.firstChild);
  } else {
    this.container.appendChild(this.canvas.view);
  }

  this.canvas.view.style.display = 'block';
}
