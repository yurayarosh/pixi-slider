export default function _handleNav() {
  if (!this.controls.prev || !this.controls.next) return;

  this.controls.prev.addEventListener('click', this.move.bind(this));
  this.controls.next.addEventListener('click', this.move.bind(this));

  const navBtns = [...this.nav.querySelectorAll('button')];

  if (!navBtns.length) return;

  navBtns.forEach((btn) => {
    btn.addEventListener('click', this.move.bind(this));
  });
}
