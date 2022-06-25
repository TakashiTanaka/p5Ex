import * as ex from "./Extension";

export class Obj {
  constructor(vector, width, height) {
    this.position = vector;
    this.width = width;
    this.height = height;
  }
}

export class Car extends Obj {
  constructor(vector, width = 100, height = 100, carColor = 100) {
    super(vector, width, height);
    this.carColor = carColor;
  }

  display() {
    rectMode(CENTER);
    noStroke();
    fill(this.carColor);
    ex.exRect(this.position, 20, 10);
    rect(this.position.x, this.position.y + 8, 36, 8);
    fill(0, 100, 0);
    circle(this.position.x - 8, this.position.y + 12, 6);
    circle(this.position.x + 8, this.position.y + 12, 6);
  }
}

export class Ball extends Obj {
  constructor(vector, radius) {
    super(vector, radius * 2);
    this.radius = radius;
  }

  display() {
    ex.exCircle(this.position, this.width);
  }
}
