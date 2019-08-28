export default function _setHTMLSlides() {
  if (!this.HTMLslides.length) return;

  const { left } = this.wrapper.getBoundingClientRect();
  this.HTMLslides.forEach((slide, i) => {
    const slideWrap = slide;
    slideWrap.setAttribute(this.constants.index, i);
    slideWrap.style.transform = 'translate(0, 0)';
    const currentLeft = slideWrap.getBoundingClientRect().left;
    const leftOffest = currentLeft - left;
    slideWrap.style.transform = `translate(-${leftOffest}px, 0)`;
    if (i === 0) {
      slideWrap.classList.add(this.constants.isActive);
    }
  });
}
