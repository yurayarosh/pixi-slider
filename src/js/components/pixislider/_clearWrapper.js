export default function _clearWrapper() {
  if (!this.props.clearWrap) return;
  if (!this.container.children.length) return;

  [...this.container.children].forEach((img) => {
    img.parentNode.removeChild(img);
  });
}
