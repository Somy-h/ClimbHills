export class BubbleCollection {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.length = 10;
    this.bubbles = [];

    for (let i = 0; i < this.length; i++) {
      this.bubbles.push(new Bubble(
        Math.floor(Math.random() * 100 + this.width),
        Math.floor(Math.random() * 100 + this.height)
      ));
    }
  }

  resize(width, height) {
    for (let i = 0; i < this.length; i++) {
      this.bubbles[i].resize(width, height);
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.length; i++) {
      this.bubbles[i].draw(ctx);
    }
  }

}

class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = this.getRandom(10, 20);
    this.opacity = 1;
  }

  move() {
    this.opacity -= 0.002;
    this.x += this.getRandom(-4, 4);
    if (this.x < 0) {
      this.x = this.width;
    }
    this.y += this.getRandom(-5, 2);
    if (this.y < 0) {
      this.y = this.height;
      this.opacity = 1;
    }
    
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    this.x = this.getRandom(0, width);
    this.y = this.getRandom(0, height);
  }

  getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  draw(ctx) {
    //ctx.fillStyle = 'white'; `
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    this.move();
    ctx.arc(this.x, this.y, this.getRandom(10, 16), 0, 2 * Math.PI); // circle
    ctx.fill();
  }

}

