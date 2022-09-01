import {
  WaveCollection
} from './waveCollection.js';

import {
  BubbleCollection
} from './bubble.js';

class App {
  constructor() {
    this.width = document.body.clientWidth;
    this.height = document.body.clientWidth;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    this.setup();
  }

  setup() {  
    this.waves = new WaveCollection();
    this.bubbles = new BubbleCollection(this.width, this.height);
  
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.width = document.body.clientWidth;
    this.height = document.body.clientWidth;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.waves.resize(this.width, this.height);
    this.bubbles.resize(this.width, this.height);

  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.waves.draw(this.ctx);
    this.bubbles.draw(this.ctx);
  }

  animate(t) {
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
}
