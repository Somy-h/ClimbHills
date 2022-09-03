//import { Sprite } from './sprite.js';

export class SpriteCollection {
  constructor() {
    this.sprites = [];
    //this.addSprite();
  }

  addSprite(sprite) {
    this.sprites.push(sprite);
  }

  resize(width, height) {
    for (let i = 0; i < this.sprites.length; i++) {
      this.sprites[i].resize(width, height);
    }    
  }

  draw(ctx, hillPoints, time) {
    for (let i = 0; i < this.sprites.length; i++) {
      this.sprites[i].draw(ctx, hillPoints, time);
    }
  }
}