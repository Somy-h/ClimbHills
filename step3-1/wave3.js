
export class Wave {
  constructor(index, pointNumber, color) {
    this.index = index;
    this.pointNumber = pointNumber;
    this.color = color;
  }

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
    this.amplitude = Math.random() * 100 + 300;
  }
  
  draw(ctx) {
    this.startAngle += 0.05;
    this.angle = this.startAngle;
    
    ctx.beginPath();
    ctx.fillStyle = this.color;

    let prevX = 0;
    //let prevY = this.amplitude * Math.sin(this.angle) + this.height/2;
    let prevY = this.amplitude * Math.sin(this.angle);
    let spaceX = Math.floor(this.width/this.pointNumber);
    for (let i = 0; i <= this.width; i += spaceX) {
      this.location.x = i;
      //this.location.y = this.amplitude * Math.sin(this.angle) + this.height/2;
      this.location.y = this.amplitude * Math.sin(this.angle);
      
      
      const cx = (prevX + this.location.x);
      const cy = (prevY + this.location.y);

      ctx.lineTo(prevX, prevY, cx, cy);
      prevX = this.location.x;
      prevY = this.location.y;
      
      this.angle += this.angleVel;
    }
    ctx.lineTo(prevX, prevY, this.width, this.locationY);
    ctx.lineTo(this.width, this.height);
    ctx.lineTo(0, this.height);
      
    ctx.fill();
    ctx.closePath();
  }
} 

