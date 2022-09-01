import {
  Wave
} from './wave.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    this.setup();
  }

  setup() {  
    this.wave = new Wave();

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.wave.resize(this.width, this.height);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.wave.draw(this.ctx);
  }

  animate(t) {
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
}
