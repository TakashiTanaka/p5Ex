// @ts-ignore
import type p5 from 'P5';

/** 最小の値（0-1） */
export type MinNum = number;

/** 最大の値（0-1） */
export type MaxNum = number;

/** ランダム値の最小・最大値 */
export type RandomRange = [MinNum, MaxNum];

/** 線 */
export type Border = {
  visible?: boolean;
  color?: any;
  weight?: number;
};

/** ドロップシャドウ */
export type DropShadow = {
  visible: boolean;
  offset?: {
    x?: number;
    y?: number;
  };
  blur?: number;
  color?: any;
};

/** 整列基準 */
export type Align = 'corner' | 'center';

/** 背景 */
export type Background = {
  visible: boolean;
  color?: any;
  border?: Border;
  blur?: number | boolean;
  dropShadow?: DropShadow | boolean;
};

/** サイズ */
export type Size = { width: number; height: number } | number;

export type HorizAlign = typeof LEFT | typeof CENTER | typeof RIGHT;

export type VertAlign = typeof TOP | typeof BOTTOM | typeof CENTER;

/** 文字の整列 */
export type TypeAlign = {
  horiz: HorizAlign;
  vert?: VertAlign | typeof BASELINE;
};

/** 色 */
export type PrimitiveColor = p5.Color | number | string | Gradient;

/** グラデーションに渡す色情報 */
export type ColorStop = [number, p5.Color | string];

/** グラデーション */
export type Gradient = {
  type: 'linear' | 'radial' | 'conic';
  colorStops: ColorStop[];
  rad: number;
};

/** シアー */
export type Shear = {
  x?: number,
  y?: number,
}

/** PrimitiveShapeのオプション */
export type PrimitiveOptions = {
  color?: PrimitiveColor | false;
  align?: Align;
  background?: Background;
  dropShadow?: DropShadow;
  rotate?: boolean | number;
  blur?: boolean | number;
  border?: Border;
  shear?: Shear;
};

/** 文字のオプション */
export type TypeOptions = {
  font?: string;
  typeAlign?: TypeAlign;
  letterSpacing?: number;
  wordSpacing?: number;
};

/** grid用のオプション */
export interface GridOptions {
  mode: 'random';
  min: number;
  max: number;
}

declare global {
  var Color: typeof p5.Color;
  var color: typeof p5.prototype.color;
  var line: typeof p5.prototype.line;
  var circle: typeof p5.prototype.circle;
  var ellipse: typeof p5.prototype.ellipse;
  var ellipseMode: typeof p5.prototype.ellipseMode;
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
  var rotate: typeof p5.prototype.rotate;
  var ceil: typeof p5.prototype.ceil;
  var floor: typeof p5.prototype.floor;
  var char: typeof p5.prototype.char;
  var textLeading: typeof p5.prototype.textLeading;
  var strokeWeight: typeof p5.prototype.strokeWeight;
  var fill: typeof p5.prototype.fill;
  var noFill: typeof p5.prototype.noFill;
  var translate: typeof p5.prototype.translate;
  var createVector: typeof p5.prototype.createVector;
  var createCanvas: typeof p5.prototype.createCanvas;
  var textFont: typeof p5.prototype.textFont;
  var cos: typeof p5.prototype.cos;
  var sin: typeof p5.prototype.sin;
  var shearX: typeof p5.prototype.shearX;
  var shearY: typeof p5.prototype.shearY;
  var random: typeof p5.prototype.random;
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
