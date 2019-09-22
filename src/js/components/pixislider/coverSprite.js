export default function fitCanvasBg(contains) {
  return (
    parentWidth,
    parentHeight,
    childWidth,
    childHeight,
    scale = 1,
    offsetX = 0.5,
    offsetY = 0.5
  ) => {
    const childRatio = childWidth / childHeight;
    const parentRatio = parentWidth / parentHeight;
    let bgWidth = parentWidth * scale;
    let bgHeight = parentHeight * scale;

    if (contains ? childRatio > parentRatio : childRatio < parentRatio) {
      bgHeight = bgWidth / childRatio;
    } else {
      bgWidth = bgHeight * childRatio;
    }

    return {
      bgWidth,
      bgHeight,
      offsetX: (parentWidth - bgWidth) * offsetX,
      offsetY: (parentHeight - bgHeight) * offsetY
    };
  };
}
