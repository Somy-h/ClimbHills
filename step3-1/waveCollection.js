import {
  Wave
} from './wave3.js';

export class WaveCollection {

  constructor() {
    this.length = 6;
    this.pointNumbers = [20, 16, 12, 10, 6, 3];
    this.colors =  [
      'rgba(190, 225, 247, 0.8)',
      'rgba(95, 134, 166, 0.4)',
      'rgba(0, 199, 235, 0.2)', 
      'rgba(0, 146, 199, 0.4)', 
      'rgba(0, 87, 158, 0.4)'
    ];

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