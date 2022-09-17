import type p5 from 'P5';

declare module 'P5';

declare global {
  var Color: typeof p5.Color;
  var color: typeof p5.prototype.color;
  var line: typeof p5.prototype.line;
  var circle: typeof p5.prototype.circle;
  var ellipse: typeof p5.prototype.ellipse;
  var triangle: typeof p5.prototype.triangle;
  var rect: typeof p5.prototype.rect;
  var point: typeof p5.prototype.point;
  var vertex: typeof p5.prototype.vertex;
  var curveVertex: typeof p5.prototype.curveVertex;
  var text: typeof p5.prototype.text;
  var textSize: typeof p5.prototype.textSize;
  var textAlign: typeof p5.prototype.textAlign;
  var textWidth: typeof p5.prototype.textWidth;
  var rectMode: typeof p5.prototype.rectMode;
  var push: typeof p5.prototype.push;
  var pop: typeof p5.prototype.pop;
  var noStroke: typeof p5.prototype.noStroke;
  var stroke: typeof p5.prototype.stroke;
  var strokeWeight: typeof p5.prototype.strokeWeight;
  var fill: typeof p5.prototype.fill;
  var noFill: typeof p5.prototype.noFill;
  var translate: typeof p5.prototype.translate;
  var createVector: typeof p5.prototype.createVector;
  var createCanvas: typeof p5.prototype.createCanvas;
  var textFont: typeof p5.prototype.textFont;
  var cos: typeof p5.prototype.cos;
  var sin: typeof p5.prototype.sin;
  var windowWidth: typeof p5.prototype.windowWidth;
  var windowHeight: typeof p5.prototype.windowHeight;
  var width: typeof p5.prototype.width;
  var height: typeof p5.prototype.height;
  var drawingContext: typeof p5.prototype.drawingContext;
  var CORNER: typeof p5.prototype.CORNER;
  var CENTER: typeof p5.prototype.CENTER;
  var LEFT: typeof p5.prototype.LEFT;
  var RIGHT: typeof p5.prototype.RIGHT;
  var TOP: typeof p5.prototype.TOP;
  var BOTTOM: typeof p5.prototype.BOTTOM;
  var BASELINE: typeof p5.prototype.BASELINE;
  var PI: typeof p5.prototype.PI;
}