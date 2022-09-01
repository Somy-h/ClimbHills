
export class Hill {
  constructor(color, speed, numOfHills) {
    this.color = color;
    this.speed = speed;
    this.numOfHills = numOfHills;
  }

  resize(width, height) {
    this.width = width;
    this.height = height;

    this.points = [];
    this.period = Math.ceil(this.width / (this.numOfHills - 2));

    for (let i = 0; i < this.numOfHills; i++) {
      this.points[i] = { x: i * this.period, y: this.getRandomY()};
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color; 

    let cur = this.points[0];
    let prev = cur;

    cur.x += this.speed;

    // Moving agin and again 
    if (cur.x > -this.period) {
      this.points.unshift( {
        x: -(this.period * 2),
        y: this.getRandomY()
      })
    } else if (cur.x > this.width + this.period) {
      //this.points?.splice(-1);
    }

    ctx.moveTo(cur.x, cur.y);    

    for (let i = 1; i < this.points.length; i++) {
      cur = this.points[i];
      cur.x += this.speed;
      const center = {
        x: (prev.x + cur.x ) / 2,
        y: (prev.y + cur.y) /2
      }
      ctx.quadraticCurveTo(prev.x, prev.y, center.x, center.y);
      prev = cur;
    }
    ctx.lineTo(prev.x, prev.y);
    ctx.lineTo(this.width, this.height);
    ctx.lineTo(this.points[0].x, this.height);
    ctx.fill();
    

  }
  
  getRandomY() {
    const min = this.height / 8;
    const max = this.height - min;
    //return Math.floor(Math.random() * (max - min) + min);
    return min + Math.random() * max;
  }
} 