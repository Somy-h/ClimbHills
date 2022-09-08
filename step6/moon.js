export class Moon {
  constructor(radius = 150) {
    this.radius = radius;
    
    this.total = 60;
    this.originPosition = [];
    this.curPosition = [];
    for (let i = 0; i < this.total; i++) {
      this.originPosition.push (
        this.getPointOnCircle(
          this.radius, 
          i * 1/this.total
        )
      );
    }
    this.curPosition = [...this.originPosition];
    this.fps = 20;
    this.fpsTime = 1000 / this.fps;
  }

  resize(width, height) {
    this.width = width;
    this.height = height;

    this.x = this.radius + 100;
    this.y = this.radius + 100;
  }

  draw(ctx, t) {
    if (!this.time) {
      this.time = t;
    }
    const now = t - this.time;
    if (now > this.fpsTime) {
      this.time = t;
      this.updatePoints();
    }
    
    ctx.fillStyle = 'orange';
    ctx.beginPath();

    let pos = this.curPosition[0];
    ctx.moveTo(pos.x + this.x, pos.y + this.y);
    for (let i = 1; i < this.total; i++) {
      pos = this.curPosition[i];
      ctx.lineTo(pos.x + this.x, pos.y + this.y);
    }
    // ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  getPointOnCircle(radius, t) {
    const theta = t * 2 * Math.PI;
    return {
      x: Math.cos(theta) * radius,
      y: Math.sin(theta) * radius
    };
  }

  // Get original position + (0 to 2)
  updatePoints() {
    for (let i = 1; i < this.total; i ++) {
      this.curPosition[i] = {
        x: this.originPosition[i].x + Math.ceil(Math.random() * 2),
        y: this.originPosition[i].y + Math.ceil(Math.random() * 2)
      }
    }
  }
}