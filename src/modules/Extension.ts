import type p5 from 'p5';

declare global {
  var line: typeof p5.prototype.line;
  var circle: typeof p5.prototype.circle;
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
  var CORNER: typeof p5.prototype.CORNER;
  var CENTER: typeof p5.prototype.CENTER;
  var LEFT: typeof p5.prototype.LEFT;
  var TOP: typeof p5.prototype.TOP;
}

// @ts-nocheck

/**
 * line()の拡張
 * @param vector1 - ベクトル1
 * @param vector2 - ベクトル2
 */
export const exLine = (vector1: p5.Vector, vector2: p5.Vector) =>
  line(vector1.x, vector1.y, vector2.x, vector2.y);

/**
 * text()の拡張
 * @param string - 文字列
 * @param vector - ベクトル
 * @param size - 文字のサイズ
 * @param options - オプション
 */
export const exText = (
  string: string,
  vector: p5.Vector,
  size: number,
  options: {
    align: string;
    background: {
      visible: boolean;
      color: any;
      border: {
        visible: boolean;
        color: any;
        weight: number;
      };
    };
  } = {
    align: 'corner',
    background: {
      visible: false,
      color: 0,
      border: {
        visible: false,
        color: 1,
        weight: 2,
      },
    },
  }
) => {
  const isAlignCorner = options.align === 'corner';
  textSize(size);
  const align = isAlignCorner ? CORNER : CENTER;
  textAlign(isAlignCorner ? LEFT : CENTER, isAlignCorner ? TOP : CENTER);
  rectMode(align);
  if (options.background.visible) {
    push();
    noStroke();
    options.background.border.visible &&
      stroke(options.background.border.color) &&
      strokeWeight(options.background.border.weight);
    fill(options.background.color);
    exRect(vector, textWidth(string), size);
    pop();
  }
  text(string, vector.x, vector.y);
};

/**
 * circle()の拡張
 * @param vector - ベクトル
 * @param diameter - 直径
 */
export const exCircle = (vector: p5.Vector, diameter: number) =>
  circle(vector.x, vector.y, diameter);

/**
 * triangle()の拡張
 * @param vector1 - ベクトル1
 * @param vector2 - ベクトル2
 * @param vector3 - ベクトル3
 */
export const exTriangle = (vector1: p5.Vector, vector2: p5.Vector, vector3: p5.Vector) =>
  triangle(vector1.x, vector1.y, vector2.x, vector2.y, vector3.x, vector3.y);

/**
 * rect()の拡張
 * @param vector - ベクトル
 * @param width - 幅
 * @param height - 高さ
 */
export const exRect = (vector: p5.Vector, width: number, height: number) =>
rect(vector.x, vector.y, width, height);

/**
 * point()の拡張
 * @param vector - ベクトル
 */
export const exPoint = (vector: p5.Vector) => point(vector.x, vector.y);

/**
 * vertexの拡張
 * @param vector - ベクトル
 */
export const exVertex = (vector: p5.Vector) => vertex(vector.x, vector.y);

/**
 * curveVertexの拡張
 * @param vector - ベクトル
 */
export const exCurveVertex = (vector: p5.Vector) => curveVertex(vector.x, vector.y);
