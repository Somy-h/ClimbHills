export class Sprite {
  constructor() {
    this.winWidth = document.body.clientWidth;
    console.log(this.winWidth);
    this.width = 100;
    this.height = 50;

    this.x = this.width + this.winWidth;
    this.y = 500;

    this.speed = 1;
  }

  resize(width, height) { 
    this.winWidth = width;
    this.winHeight = height;
  }

  move(hillPoints) {
    this.x -= this.speed;
    if (this.x < -this.width) {
      this.x = this.width + this.winWidth;
    }
    let closestPoint = this.getClosestPoint(hillPoints);
    this.y = closestPoint.y;
    this.rotationAngle = closestPoint.rotation;
  }

  draw(ctx, hillPoints) {
    ctx.save();
    
    this.move(hillPoints);
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

  getClosestPoint(hillPoints) {
    //debugger;
    
    for (let i = hillPoints.length - 1; i >= 0; i--) {
      if (this.x >= hillPoints[i].x1 && this.x <= hillPoints[i].x3) {
        return this.getClosestDetailPoint(hillPoints[i]);
      }
    }
    return this.getClosestDetailPoint(hillPoints.length - 1);
  }

  getClosestDetailPoint(hillPoint) {
    const totalPoint = 200;
    let point = this.getPointOnQuad(
      hillPoint.x1, hillPoint.y1,
      hillPoint.x2, hillPoint.y2,
      hillPoint.x3, hillPoint.y3, 
      0
    );
    let prevX = point.x;

    for (let i = 1; i < totalPoint; i++) {
      const t = i / totalPoint;
      point = this.getPointOnQuad(
        hillPoint.x1, hillPoint.y1,
        hillPoint.x2, hillPoint.y2,
        hillPoint.x3, hillPoint.y3, 
        t
      );

      if (this.x >= prevX && this.x <= point.x) {
        return point;
      }
      prevX = point.x;
    }
    return point;
  }

  // https://javascript.info/bezier-curve
  getQuadraticValue (p0, p1, p2, t) {
    return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
  }

  getPointOnQuad(x1, y1, x2, y2, x3, y3, t) {
    return {
      x: this.getQuadraticValue(x1, x2, x3, t),
      y: this.getQuadraticValue(y1, y2, y3, t),
      rotation: this.quadraticBezierAngle(x1, y1, x2, y2, x3, y3, t)
    }
  }


  //https://stackoverflow.com/questions/12357200/angle-of-a-given-point-on-a-bezier-curve
 
  // quadraticBezierAngle(u:Number, anchor1:Point, anchor2:Point, control:Point):Number {
  //   var uc:Number = 1 - u;
  //   var dx:Number = (uc * control.x + u * anchor2.x) - (uc * anchor1.x + u * control.x);
  //   var dy:Number = (uc * control.y + u * anchor2.y) - (uc * anchor1.y + u * control.y);
  //   return Math.atan2(dy, dx);
  // }

  quadraticBezierAngle(x1, y1, x2, y2, x3, y3, t) {
    const dx = ((1 - t) * x2 + t * x3) - ((1 - t) * x1 + t * x2);
    const dy = ((1 - t) * y2 + t * y3) - ((1 - t) * y1 + t * y2);
    return Math.atan2(dy, dx);
  }
}


