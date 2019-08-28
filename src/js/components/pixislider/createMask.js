import * as PIXI from 'pixi.js';

export default function createMask(x, y, width, height) {
  const mask = new PIXI.Graphics();
  mask.beginFill(0xFFFFFF, 1);
  mask.fillAlpha = 0;
  mask.lineAlignment = 0;
  mask.drawRect(x, y, width, height);

  return mask;
}
