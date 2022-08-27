// @ts-nocheck

import * as ex from './Extension';

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

export class ExEllipse extends Obj {
  constructor(vector, width, height, pointNum = 60) {
    super(vector, width, height);
    this.points = [];
    this.pointNum = pointNum;
    this.size = { width: this.width, height: this.height };
    return this;
  }

  createPoints() {
    this.points = [];
    for (let i = 0; i <= this.pointNum; i++) {
      this.points.push(
        createVector(
          this.position.x + (this.size.width / 2) * cos((TAU / this.pointNum) * i),
          this.position.y + (this.size.height / 2) * sin((TAU / this.pointNum) * i)
        )
      );
    }
    return this;
  }

  draw() {
    beginShape();
    this.points.forEach(point => ex.exCurveVertex(point));
    ex.exCurveVertex(this.points[1]);
    ex.exCurveVertex(this.points[2]);
    endShape();
  }
}
