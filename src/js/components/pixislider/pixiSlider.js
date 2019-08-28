// based on https://github.com/wwwednesday/pixi-slider

import * as PIXI from 'pixi.js';
import { TimelineLite, Power2 } from 'gsap';
import { debounce } from 'throttle-debounce';
import _clearWrapper from './_clearWrapper';
import _createNav from './_createNav';
import _setHTMLSlides from './_setHTMLSlides';
import _handleNav from './_handleNav';
import _initListeners from './_initListeners';
import _loadPictures from './_loadPictures';
import move from './_move';
import _addStage from './_addStage';
import returnConstants from './_returnConstants';
import coverSprite from './coverSprite';
import createMask from './createMask';

export default class PixiSlider {
  constructor(props) {
    this.constants = returnConstants();
    this.container = props.container;
    this.wrapper = this.container.querySelector(`.${this.constants.wrap}`);
    this.props = props;
    this.controls = props.arrows;
    this.nav = props.nav;
    this.speed = props.speed * 0.4;
    this.displacement = props.displacement;
    this.displacement.speed = props.speed * 0.6;
    this.HTMLslides = [...this.wrapper.children];
    this.slidesData = {
      images: this.HTMLslides.map((item) => item.getAttribute('data-src')),
      titles: this.HTMLslides.map((item) => item.querySelector('.slider__title')),
    };

    this.size = {
      width: this.container.offsetWidth,
      height: this.container.offsetHeight,
    };

    this.canvas = null;
    this.slides = null;
    this.active = 0;
    this.DisplacementSprite = null;
    this.DisplacementFilter = null;
    this.isPlaying = false;
    this.dragging = false;
    this.direction = null;

    this.move = move;

    this.init();
  }

  _createTitle(titleEl) {
    const text = titleEl.innerText;

    this.title = new PIXI.Text(text, this.props.title.style);
    this.title.x = this.size.width / 2;
    this.title.y = this.size.height / 2;
    this.title.anchor.set(0.5);

    return this.title;
  }

  _animate() {
    const tl = new TimelineLite()
      .fromTo(
        this.title,
        this.speed,
        { x: this.title.x, y: this.title.y, alpha: this.title.alpha },
        { x: this.title.x - 50, y: this.title.y - 50, alpha: 0 },
      )
      .to(
        this.DisplacementFilter.scale,
        this.displacement.speed,
        {
          x: this.displacement.scale.x,
          y: this.displacement.scale.y,
          ease: Power2.easeInOut,
        },
        `-=${this.speed + 0.1}`,
      )
      .to(
        this.DisplacementSprite.position,
        this.displacement.speed,
        {
          x: this.displacement.offset.x,
          y: this.displacement.offset.y,
          ease: Power2.easeInOut,
        },
        0,
      )
      .to(
        this.DisplacementFilter.scale,
        this.speed,
        {
          x: 0,
          y: 0,
          ease: Power2.easeInOut,
        },
      )
      .set(
        this.DisplacementSprite.position,
        {
          x: 0,
          y: 0,
        },
      );
    return tl;
  }

  _createFilter() {
    if (this.displacement === undefined) return;

    // eslint-disable-next-line
    this.DisplacementSprite = new PIXI.Sprite.from(this.displacement.img);
    this.DisplacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    this.DisplacementFilter = new PIXI.filters.DisplacementFilter(this.DisplacementSprite);
    this.DisplacementFilter.scale = new PIXI.Point(0, 0);

    this.canvas.stage.filters = [this.DisplacementFilter];
    this.canvas.stage.addChild(this.DisplacementSprite);
  }

  _goTo(newIndex) {
    const slides = this.slides.children;

    const tl = new TimelineLite({
      onComplete: () => {
        this.active = newIndex;
        this.isPlaying = false;
        this.HTMLslides[newIndex].classList.add(this.constants.isActive);
        // remove slide text
        this.canvas.stage.removeChild(this.canvas.stage.children[2]);
      },
    });

    const offset = this.direction > 0 ? -this.size.width : this.size.width;

    this.HTMLslides[this.active].classList.remove(this.constants.isActive);
    // add active slide title and remove previous
    this.canvas.stage.removeChild(this.canvas.stage.children[2]);
    this.canvas.stage.addChild(this._createTitle(this.slidesData.titles[this.active]));

    if (this.displacement !== undefined) tl.add(this._animate());

    tl
      .fromTo(slides[this.active].position, this.speed, { x: 0 }, { x: offset, ease: Power2.easeInOut }, `-=${this.speed}`)
      .fromTo(slides[newIndex].position, this.speed, { x: -offset }, { x: 0, ease: Power2.easeInOut }, `-=${this.speed}`);
  }

  _renderSlide(image, index) {
    const { width, height } = this.size;
    const slide = new PIXI.Container();

    // eslint-disable-next-line
    const bg = new PIXI.Sprite.from(image);
    const { scale, pos } = coverSprite({ height, width }, bg);
    bg.scale = new PIXI.Point(scale, scale);
    bg.position = new PIXI.Point(pos.x, pos.y);

    const mask = createMask(0, 0, width, height);

    slide.addChild(bg);
    slide.addChild(mask);
    slide.mask = mask;

    if (index !== 0) {
      // slide.alpha = 0;
      slide.position.x = -this.size.width;
    }

    return slide;
  }

  _initSlides() {
    this.slides = new PIXI.Container();
    this.canvas.stage.addChild(this.slides);
    this.slidesData.images.forEach((item, index) => {
      this.slides.addChild(this._renderSlide(item, index));
    });
  }


  _setWindowSize() {
    this.size = {
      width: this.container.offsetWidth,
      height: this.container.offsetHeight,
    };
  }

  resize() {
    this._setWindowSize();

    const { width, height } = this.size;

    this.canvas.renderer.resize(width, height);
    this.canvas.stage.removeChildren();
    this._render();
  }

  _render() {
    this._initSlides();
    this._createFilter();
  }

  init() {
    _clearWrapper.call(this);
    _createNav.call(this);
    _addStage.call(this);
    _setHTMLSlides.call(this);
    _loadPictures.call(this);
    // _initListeners.call(this);
    _handleNav.call(this);

    return this;
  }
}

// const slider = document.querySelector('.js-slider');
// const prev = slider.querySelector('.js-prev');
// const next = slider.querySelector('.js-next');
// const nav = slider.querySelector('.js-slider-nav');
// const title = slider.querySelector('.slider__title');

// const titleStyle = window.getComputedStyle(title);


// const mySlider = new PixiSlider({
//   container: slider,
//   clearWrap: false,
//   arrows: {
//     prev,
//     next
//   },
//   nav,
//   speed: 1.4,
//   displacement: {
//     img: './img/noise-01.png',
//     scale: {
//       x: 100,
//       y: 100
//     },
//     offset: {
//       x: 0,
//       y: 0
//     }
//   },
//   title: {
//     style: {
//       fontFamily: titleStyle.fontFamily,
//       fontSize: titleStyle.fontSize,
//       fill: titleStyle.color,
//       textTransform: titleStyle.textTransform,
//     }
//   }
// });

// const resizeSlider = debounce(200, () => {
//   mySlider.resize();
// });

// window.addEventListener('resize', resizeSlider);

const sliders = [...document.querySelectorAll('.js-slider')];

sliders.forEach((slider) => {
  const prev = slider.querySelector('.js-prev');
  const next = slider.querySelector('.js-next');
  const nav = slider.querySelector('.js-slider-nav');
  const title = slider.querySelector('.slider__title');

  const titleStyle = window.getComputedStyle(title);

  const mySlider = new PixiSlider({
    container: slider,
    clearWrap: false,
    arrows: {
      prev,
      next,
    },
    nav,
    speed: 1.4,
    displacement: {
      img: './img/noise-01.png',
      scale: {
        x: 100,
        y: 100,
      },
      offset: {
        x: 0,
        y: 0,
      },
    },
    title: {
      style: {
        fontFamily: titleStyle.fontFamily,
        fontSize: titleStyle.fontSize,
        fill: titleStyle.color,
        textTransform: titleStyle.textTransform,
      },
    },
  });
});
