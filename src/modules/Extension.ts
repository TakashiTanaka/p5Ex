import { dropShadow, rotateCenter, resetAppearance, blur } from './Function';
import type p5 from 'p5';
import { CENTER, CORNER } from 'p5';

declare global {
  var color: typeof p5.prototype.color;
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
  var translate: typeof p5.prototype.translate;
  var createVector: typeof p5.prototype.createVector;
  var width: typeof p5.prototype.width;
  var height: typeof p5.prototype.height;
  var drawingContext: typeof p5.prototype.drawingContext;
  var CORNER: typeof p5.prototype.CORNER;
  var CENTER: typeof p5.prototype.CENTER;
  var LEFT: typeof p5.prototype.LEFT;
  var TOP: typeof p5.prototype.TOP;
}

type Background = {
  visible: boolean;
  color?: any;
  border?: {
    visible?: boolean;
    color?: any;
    weight?: number;
  };
  blur?: number | boolean
};

type DropShadow = {
  visible: boolean;
  offset?: {
    x?: number;
    y?: number;
  };
  blur?: number;
  color?: any;
};

type Align = 'corner' | 'center';

type Border = {
  visible: false;
  color: 1;
  weight: 2;
};

// @ts-nocheck

class exClass {
  constructor(public vector: p5.Vector, public size: number) {
    this.vector = vector;
    this.size = size;
  }
}

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
  options?: {
    color?: any;
    align?: Align;
    background?: Background;
    dropShadow?: DropShadow;
    rotate?: boolean | number;
    blur?: boolean | number; 
  }
) => {
  /* options */
  const _string = string ?? 'p5Ex', 
        _vector = vector ?? createVector(width / 2, height / 2),
        _size = size ?? 16,
        _color = options?.color ?? 0,
        _align = options?.align ?? 'corner',
        _background = options?.background ?? false,
        _backgroundVisible = options?.background?.visible ?? false,
        _backgroundColor = options?.background?.color ?? 0,
        _backgroundBorder = options?.background?.border ?? false,
        _backgroundBorderVisible = options?.background?.border?.visible ?? false,
        _backgroundBorderColor = options?.background?.border?.color ?? 0,
        _backgroundBorderWeight = options?.background?.border?.weight ?? 2,
        _dropShadow = options?.dropShadow ?? false,
        _dropShadowVisible = options?.dropShadow?.visible ?? false,
        _dropShadowOffsetX = options?.dropShadow?.offset?.x ?? 4,
        _dropShadowOffsetY = options?.dropShadow?.offset?.y ?? 4,
        _dropShadowBlur = options?.dropShadow?.blur ?? 4,
        _dropShadowColor = options?.dropShadow?.color ?? 1,
        _rotate = options?.rotate ?? false,
        _blur = options?.blur ?? false;

  push();

  textSize(_size);

  if (_rotate && typeof _rotate !== 'boolean') {
    rotateCenter(_vector, _rotate);
  } else {
    exTranslate(_vector);
  }

  const isAlignCorner = _align === 'corner';
  const align = isAlignCorner ? CORNER : CENTER;
  textAlign(isAlignCorner ? LEFT : CENTER, isAlignCorner ? TOP : CENTER);
  rectMode(align);

  if (_background && _backgroundVisible) {
    push();
    resetAppearance();
    if(_backgroundBorder && _backgroundBorderVisible){
      stroke(_backgroundBorderColor);
      strokeWeight(_backgroundBorderWeight);
    }
    exRect(_vector, textWidth(_string), _size, { color: _backgroundColor });
    pop();
  }

  fill(_color);

  if (_dropShadow && _dropShadowVisible) {
    dropShadow({
      x: _dropShadowOffsetX,
      y: _dropShadowOffsetY,
      blur: _dropShadowBlur,
      color: _dropShadowColor,
    });
  }

  if(typeof _blur === 'number') {
    blur(_blur);
  }

  text(_string, 0, 0);

  pop();
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
export const exRect = (
  vector: p5.Vector,
  width: number,
  height: number,
  options?: {
    color: any;
    border?: Border;
    dropShadow?: DropShadow;
    rotate?: boolean | number;
    rectMode?: CENTER | CORNER;
  }
) => {
  const defaultOptions = {
    color: 0,
    border: {
      visible: false,
      color: 1,
      weight: 2,
    },
    dropShadow: {
      visible: false,
      offset: {
        x: 4,
        y: 4,
      },
      blur: 4,
      color: 1,
    },
    rotate: false,
    rectMode: CORNER,
  };

  const useOptions = { ...defaultOptions, ...options };

  push();

  rectMode(useOptions.rectMode);
  if (typeof useOptions.rotate === 'number') {
    rotateCenter(vector, useOptions.rotate);
  }

  if (useOptions.dropShadow.visible) {
    dropShadow({
      x: useOptions.dropShadow.offset.x,
      y: useOptions.dropShadow.offset.y,
      blur: useOptions.dropShadow.blur,
      color: useOptions.dropShadow.color,
    });
  }

  if (typeof useOptions.color === 'string') {
    fill(useOptions.color);
  } else {
    fill(useOptions.color);
  }

  noStroke();
  useOptions.border.visible &&
    stroke(useOptions.border.color) &&
    strokeWeight(useOptions.border.weight);

  rect(0, 0, width, height);

  pop();
};

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

/**
 * translate()
 * @param vector - ベクトル
 */
export const exTranslate = (vector: p5.Vector) => translate(vector.x, vector.y);
