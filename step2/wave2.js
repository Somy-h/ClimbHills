
export class Wave {
  constructor()  {}

  resize(width, height) {
    this.width = width;
    this.height = height;

    this.location = {
      x: width / 2, 
      y: height / 2
    };    
    
    this.startAngle = 0;
    this.angle = 0;
    this.angleVel = 0.2;
    this.amplitude = Math.random() * 100 + 200;
  }

  draw(ctx) {
    this.startAngle += 0.015;
    this.angle = this.startAngle;

    for (let i = 0; i <= this.width; i += 40) {
      this.location.x = i;
      this.location.y = this.amplitude * Math.sin(this.angle);

      ctx.beginPath();
      ctx.fillStyle = 'gray';
      ctx.arc(this.location.x, this.location.y + (this.height / 2), 30, 0, 2 * Math.PI); // circle
      ctx.fill();

      this.angle += this.angleVel;
    }
  }
} 

