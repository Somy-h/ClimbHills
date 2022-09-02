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

  draw(ctx) {
    for (let i = 0; i < this.sprites.length; i++) {
      const sprite = this.sprites[i];
      sprite.draw(ctx);
    }
  }
}

class Sprite {
  constructor() {
    this.winWidth = document.body.clientWidth;
    console.log(this.winWidth);
    this.width = 100;
    this.height = 50;

    this.x = 0;
    this.y = 400;
  }

  resize(width, height) { 
    this.winWidth = width;
    this.winHeight = height;
  }

  move() {
    this.x = (this.x + 1) % (this.winWidth + 100);
  }

  draw(ctx) {
    
    ctx.save();
    this.move();
    this.drawCar(ctx);
    
    ctx.restore();
  }

  drawCar(ctx) {
    ctx.translate(this.x, this.y);
    ctx.fillStyle = 'red';
    ctx.fillRect(
      -(this.width / 2),
      -this.height,
      this.width,
      this.height
    );

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(- this.width/4, 0, this.height/3, 0, 2 * Math.PI); // wheel
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(this.width/4, 0, this.height/3, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    
  }
}