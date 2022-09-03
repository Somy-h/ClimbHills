import { Sprite } from './sprite.js';

export class Sheep extends Sprite {
   constructor(width, height, speed = 1) {
    super(width, height, speed);

    this.img = new Image();
    this.img.src = './sheep.png';

    this.sheepWidth = 180;
    this.sheepHeight = 150;
  
    this.curFrame = 0;  
    this.totalFrame = 8;

    // Check for Timestamp 
    this.fps = 24;
    this.prevTime = 0;
  }

  resize(winWidth, winHeight) { 
    super.resize(winWidth, winHeight);
  }

  move(hillPoints) {
    super.move(hillPoints);
  }

  draw(ctx, hillPoints, time) {
    if (this.prevTime == 0) {
      this.prevTime = time;
    }
    const now = (time - this.prevTime);
    //console.log(`st: ${time}, now: ${now}`);
    if (now > (1000 / this.fps)) {   
      this.prevTime = time;
      this.curFrame += 1;
      if (this.curFrame >= this.totalFrame) {
        this.curFrame = 0;
      }
    }

    ctx.save();
    
    this.move(hillPoints);
    this.drawSheep(ctx);
    
    ctx.restore();
  }

  drawSheep(ctx) {

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotationAngle);

    ctx.fillStyle = 'black';
    ctx.drawImage(
      this.img,
      this.width * this.curFrame,
      0,
      this.width,
      this.height,
      -this.sheepWidth / 2,
      -this.sheepHeight + 20,
      this.sheepWidth,
      this.sheepHeight
    );
  }
}