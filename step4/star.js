
export class StarCollection {
  constructor(numOfStars) {
    this.length = numOfStars;
    this.stars = [];

    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;

    for (let i = 0; i < this.length; i++) {
      this.stars.push(new Star(
        Star.getRandom(0, this.width),
        Star.getRandom(0, this.height)
      ));
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.length; i++) {
      this.stars[i].draw(ctx);
    }
  }
}


class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Star.getRandom(2, 6);
    this.color = `rgba(255, ${Star.getRandom(180, 255)}, 0, 0.7)`;
    this.opacity = 1;
  }

  draw(ctx) {
    this.drawStar(ctx);
  }

  static getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  drawTriangle(ctx, h, w) {
    ctx.moveTo(0,  h);
    ctx.lineTo(-w, 0);
    ctx.lineTo(w, 0);
    ctx.fill();
  }

  drawStar(ctx) {
    let w = this.size * Math.cos(72 * (Math.PI / 180));
    let h = this.size * Math.sin(72 * (Math.PI / 180));

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, ${Star.getRandom(200, 255)}, 0, 0.7)`;
    ctx.translate(this.x, this.y);
    for (let i = 0; i < 5; i++) {  
      this.drawTriangle(ctx, h, w);
      ctx.moveTo(this.x, this.y);
      ctx.rotate(72* (Math.PI / 180));
    }
    ctx.translate(-this.x, -this.y);
    ctx.closePath();
  }

}