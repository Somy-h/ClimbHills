import { Hill } from './hill.js';
import { StarCollection } from './star.js';
import { SpriteCollection } from './spriteCollection.js';
import { Car } from './car.js';
import { Sheep } from './sheep.js';

/*
Reference:
Wave:
https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-oscillations/a/waves

https://youtu.be/hCHL7sydzn0
*/
class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    this.setup();
  }

  setup() {  
    this.hills = [
      new Hill('#6E817C', 0.2, 10),
      new Hill('#364841', 0.5, 8),
      new Hill('#0D261D', 1.4, 6)
    ];

    this.stars = new StarCollection(200);

    // add sprites
    this.sprites = new SpriteCollection(); 
    this.sprites.addSprite(new Car(100, 50, Math.random() * 2 + 1));
    this.sprites.addSprite(new Car(100, 50, Math.random() * 2 + 1));
    this.sprites.addSprite(new Sheep(360, 300));
    this.sprites.addSprite(new Sheep(360, 300, Math.random() * 2 + 1));
    this.sprites.addSprite(new Sheep(360, 300, Math.random() * 2 + 1));


    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
    //this.draw(); //for test
  }

  resize() {
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    for (let i = 0; i < this.hills.length; i++) {
      this.hills[i].resize(this.width, this.height);
    }
    this.stars.resize(this.width, this.height);
    this.sprites.resize(this.width, this.height);
  }

  draw(time) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.stars.draw(this.ctx);
    
    let hillPoints;
    for (let i = 0; i < this.hills?.length; i++) {
      hillPoints = this.hills[i].draw(this.ctx);
    }

    this.sprites.draw(this.ctx, hillPoints, time);
  }

  animate(time) {
    this.draw(time);
    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
}
