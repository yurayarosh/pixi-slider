import lozad from 'lozad';
import { IS_LOADED } from '../constants';

export default function lazyLoading() {
  const imgs = [].slice.call(document.querySelectorAll('.js-lazy'));

  if (!imgs.length) return;
  imgs.forEach((img) => {
    const observer = lozad(img, {
      loaded: (el) => {
        if (el.hasAttribute('data-src')) {
          el.removeAttribute('data-src');
        } else if (el.hasAttribute('data-background-image')) {
          el.removeAttribute('data-background-image');
        }
        el.classList.add('lazy');
        el.classList.add(IS_LOADED);
      },
    });
    observer.observe();
  });
}
