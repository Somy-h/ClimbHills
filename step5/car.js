import { Sprite } from './sprite.js';

export class Car extends Sprite {
  constructor(width, height, speed) {
    super(width, height, speed);
  }

  resize(winWidth, winHeight) { 
    super.resize(winWidth, winHeight);
  }

  move(hillPoints) {
    super.move(hillPoints);
  }

  draw(ctx, hillPoints) {
    ctx.save();
    
    super.move(hillPoints);
    this.drawCar(ctx);
    
    ctx.restore();
  }

  drawCar(ctx) {

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotationAngle);

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


