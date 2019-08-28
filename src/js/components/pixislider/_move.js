export default function _move(e) {
  if (e !== undefined) e.preventDefault();

  let state;
  if (e.currentTarget === this.controls.prev) {
    state = 'prev';
  } else if (e.currentTarget === this.controls.next) {
    state = 'next';
  }

  if (this.isPlaying) return;
  this.isPlaying = true;

  const slidesCount = this.slides.children.length;
  if (state === 'prev') {
    this.direction = -1;
    if (this.active > 0 && this.active <= slidesCount - 1) {
      this._goTo(this.active - 1);
    } else {
      this._goTo(slidesCount - 1);
    }
  } else if (state === 'next') {
    this.direction = 1;
    if (this.active >= 0 && this.active < slidesCount - 1) {
      this._goTo(this.active + 1);
    } else {
      this._goTo(0);
    }
  } else {
    const index = +e.currentTarget.getAttribute(this.constants.index);
    if (index - this.active > 0) {
      this.direction = 1;
    } else {
      this.direction = -1;
    }

    this._goTo(index);
  }
}
