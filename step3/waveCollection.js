import {
  Wave
} from './wave3.js';

export class WaveCollection {

  constructor() {
    this.length = 3;
    this.pointNumbers = [10, 6, 3];
    // this.colors =  ['rgba(0, 199, 235, 0.4)', 'rgba(0, 146, 199, 0.4)', 'rgba(0, 87, 158, 0.4)'];
    this.colors =  ['rgba(148, 243, 205, 0.4)', 'rgba(46, 197, 134, 0.4)', 'rgba(35, 125, 31, 0.8)'];


    this.waves = [];

    for (let i = 0; i < this.length; i++) {
      let wave = new Wave(i, this.pointNumbers[i], this.colors[i]);
      this.waves.push(wave);
    }
  }

  resize(width, height) {
    for (let i = 0; i < this.length; i++) {
      this.waves[i].resize(width, height);
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.length; i++) {
      this.waves[i].draw(ctx);
    }
  }

}