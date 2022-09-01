import {
  Vector
} from './vector.js';


export class Wave {
  constructor()  {}

  resize(width, height) {

    
    this.width = width;
    this.height = height;

    this.location = new Vector(width / 2, height / 2);    
    
    this.startAngle = 0;
    this.angle = 0;
    this.angleVel = 0.2;
    this.amplitude = Math.random() * 100 + 200;
  }

  draw(ctx) {
    this.startAngle += 0.015;
    this.angle = this.startAngle;
    this.location.y = this.amplitude * Math.sin(this.angle);

    ctx.beginPath();
    ctx.fillStyle = 'gray';
    ctx.arc(this.location.x, this.location.y + (this.height / 2), 30, 0, 2 * Math.PI); // circle
    ctx.fill();

  }
} 

