const Obj = p5ex.Object;

function setup() {
  createCanvas(1000, 1000);
  background(240);
	const car = new Obj.Car(createVector(width / 2, height / 2)).display();
	const ball = new Obj.Ball(createVector(width / 2 - 100, height / 2), 50).display();
}
