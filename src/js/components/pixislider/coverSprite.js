import * as PIXI from 'pixi.js';

export default function coverSprite(bgSize, sprite) {
  const forceSize = {
    width: sprite.width,
    height: sprite.height,
  };

  const winratio = bgSize.width / bgSize.height;
  const spratio = forceSize.width / forceSize.height;

  const pos = new PIXI.Point(0, 0);
  let scale = 1;

  if (winratio > spratio) {
    // photo is wider than background
    scale = bgSize.width / forceSize.width;
  } else {
    // photo is taller than background
    scale = bgSize.height / forceSize.height;
  }

  pos.x = -((forceSize.width * scale) - bgSize.width) / 2;
  pos.y = -((forceSize.height * scale) - bgSize.height) / 2;

  return {
    scale,
    pos,
  };
}
