import { Sprite } from './sprite.js';

export class SpriteCollection {
  constructor() {
    this.sprites = [];
    this.addSprite();
  }

  addSprite() {
    this.sprites.push(new Sprite());
  }

  resize(width, height) {
    for (let i = 0; i < this.sprites.length; i++) {
      const sprite = this.sprites[i];
      sprite.resize(width, height);
    }    
  }

  draw(ctx, hillPoints) {
    for (let i = 0; i < this.sprites.length; i++) {
      const sprite = this.sprites[i];
      sprite.draw(ctx, hillPoints);
    }
  }
}