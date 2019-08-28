export default function _clearWrapper() {
  if (!this.props.clearWrap) return;
  if (!this.wrapper.children.length) return;

  [...this.wrapper.children].forEach((img) => {
    img.parentNode.removeChild(img);
  });
}
