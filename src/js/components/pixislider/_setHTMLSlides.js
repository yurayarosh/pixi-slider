export default function _setHTMLSlides() {
  if (!this.HTMLslides.length) return;
  const IS_ACTIVE = this.constants.isActive;

  const { left } = this.container.getBoundingClientRect();
  const activeSlides = this.HTMLslides.filter((slide) => slide.classList.contains(IS_ACTIVE));
  this.HTMLslides.forEach((slide, i) => {
    const slideWrap = slide;
    slideWrap.setAttribute(this.constants.index, i);
    slideWrap.style.transform = 'translate(0, 0)';
    const currentLeft = slideWrap.getBoundingClientRect().left;
    const leftOffest = currentLeft - left;
    slideWrap.style.transform = `translate(-${leftOffest}px, 0)`;

    if (!activeSlides.length && i === 0) {
      slideWrap.classList.add(IS_ACTIVE);
    }
  });
}
