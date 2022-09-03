export class Sprite {
  constructor(width, height, speed = 1) {
    this.winWidth = document.body.clientWidth;
    // this.width = 100;
    // this.height = 50;
    this.width = width;
    this.height = height;

    this.x = this.width + this.winWidth;
    this.y = 0;
    this.speed = speed;
    this.rotationAngle = 0;
  }

  resize(winWidth, winHeight) { 
    this.winWidth = winWidth;
    this.winHeight = winWidth;
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

  getClosestPoint(hillPoints) {    
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
  quadraticBezierAngle(x1, y1, x2, y2, x3, y3, t) {
    const dx = ((1 - t) * x2 + t * x3) - ((1 - t) * x1 + t * x2);
    const dy = ((1 - t) * y2 + t * y3) - ((1 - t) * y1 + t * y2);
    return Math.atan2(dy, dx);
  }
}


