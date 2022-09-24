import type p5 from 'P5';
import * as ex from './Extension';

// export class ExEllipse extends Obj {
//   constructor(vector, width, height, pointNum = 60) {
//     super(vector, width, height);
//     this.points = [];
//     this.pointNum = pointNum;
//     this.size = { width: this.width, height: this.height };
//     return this;
//   }

//   createPoints() {
//     this.points = [];
//     for (let i = 0; i <= this.pointNum; i++) {
//       this.points.push(
//         createVector(
//           this.position.x + (this.size.width / 2) * cos((TAU / this.pointNum) * i),
//           this.position.y + (this.size.height / 2) * sin((TAU / this.pointNum) * i)
//         )
//       );
//     }
//     return this;
//   }

//   draw() {
//     beginShape();
//     this.points.forEach(point => ex.exCurveVertex(point));
//     ex.exCurveVertex(this.points[1]);
//     ex.exCurveVertex(this.points[2]);
//     endShape();
//   }
// }
