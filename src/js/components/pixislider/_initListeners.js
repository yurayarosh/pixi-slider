function _onDragStart() {
  this.dragging = true;
}

function _onDragEnd() {
  this.dragging = false;

  if (this.direction > 0) {
    this.move('next');
  } else {
    this.move('prev');
  }
}

function _onDragMove(e) {
  if (this.dragging) {
    this.direction = e.data.originalEvent.movementX;
  }
}

export default function _initListeners() {
  this.canvas.stage.interactive = true;
  this.canvas.stage.buttonMode = true;

  this.canvas.stage
    .on('mousedown', _onDragStart.bind(this))
    .on('touchstart', _onDragStart.bind(this))
    .on('mouseup', _onDragEnd.bind(this))
    .on('mouseupoutside', _onDragEnd.bind(this))
    .on('touchend', _onDragEnd.bind(this))
    .on('touchendoutside', _onDragEnd.bind(this))
    .on('mousemove', _onDragMove.bind(this))
    .on('touchmove', _onDragMove.bind(this));
}
