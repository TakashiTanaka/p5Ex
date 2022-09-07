import { dropShadow, rotateCenter, resetAppearance, blur } from './Function';
import type p5 from 'p5';

function implementsColor(arg: any): arg is typeof Color {
  return arg !== null &&
    typeof arg === 'object';
}

type Border = {
  visible?: boolean;
  color?: any;
  weight?: number;
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

type Background = {
  visible: boolean;
  color?: any;
  border?: Border;
  blur?: number | boolean;
  dropShadow?: DropShadow | boolean;
};

type Size = { width: number; height: number } | number;

type PrimitiveOptions = {
  color?: p5.Color | number | string | false;
  align?: Align;
  background?: Background;
  dropShadow?: DropShadow;
  rotate?: boolean | number;
  blur?: boolean | number;
  border?: Border;
};

// @ts-nocheck

class PrimitiveShape {
  protected _vector: p5.Vector;
  protected _size: number | Size;
  protected _color: p5.Color | string | number | false;
  protected _align: Align;
  protected _background: Background | boolean;
  protected _backgroundVisible: boolean;
  protected _backgroundColor: any;
  protected _backgroundBorder: Border | boolean;
  protected _backgroundBorderVisible: boolean;
  protected _backgroundBorderColor: any;
  protected _backgroundBorderWeight: number;
  protected _dropShadow: DropShadow | boolean;
  protected _dropShadowVisible: boolean;
  protected _dropShadowOffsetX: number;
  protected _dropShadowOffsetY: number;
  protected _dropShadowBlur: number;
  protected _dropShadowColor: any;
  protected _rotate: number | boolean;
  protected _blur: number | boolean;
  protected _border: Border | boolean;
  protected _borderVisible: boolean;
  protected _borderColor: p5.Color;
  protected _borderWeight: number;

  constructor(
    public callback: typeof rect | typeof ellipse | typeof text,
    public vector: p5.Vector,
    public size: number | Size,
    public options?: PrimitiveOptions
  ) {
    this.options = options;
    this._vector = this.vector ?? createVector(width / 2, height / 2);
    this._size = this.size ?? 16;
    this._color = this.options?.color ?? 'black';
    this._align = this.options?.align ?? 'corner';
    this._background = this.options?.background ?? false;
    this._backgroundVisible = this.options?.background?.visible ?? false;
    this._backgroundColor = this.options?.background?.color ?? 0;
    this._backgroundBorder = this.options?.background?.border ?? false;
    this._backgroundBorderVisible = this.options?.background?.border?.visible ?? false;
    this._backgroundBorderColor = this.options?.background?.border?.color ?? 0;
    this._backgroundBorderWeight = this.options?.background?.border?.weight ?? 2;
    this._dropShadow = this.options?.dropShadow ?? false;
    this._dropShadowVisible = this.options?.dropShadow?.visible ?? false;
    this._dropShadowOffsetX = this.options?.dropShadow?.offset?.x ?? 4;
    this._dropShadowOffsetY = this.options?.dropShadow?.offset?.y ?? 4;
    this._dropShadowBlur = this.options?.dropShadow?.blur ?? 4;
    this._dropShadowColor = this.options?.dropShadow?.color ?? 1;
    this._rotate = this.options?.rotate ?? false;
    this._blur = this.options?.blur ?? false;
    this._border = this.options?.border ?? false;
    this._borderVisible = this.options?.border?.visible ?? false;
    this._borderColor = this.options?.border?.color ?? 0;
    this._borderWeight = this.options?.border?.weight ?? 2;
  }

  align() {
    if(this._align === 'corner') {
      rectMode('corner');
    } else if(this._align === 'center') {
      rectMode('center');
    }
  }

  rotate() {
    if (this._rotate && typeof this._rotate !== 'boolean') {
      rotateCenter(this._vector, this._rotate);
    } else {
      exTranslate(this._vector);
    }
  }

  dropShadow() {
    if (this._dropShadow && this._dropShadowVisible) {
      dropShadow({
        x: this._dropShadowOffsetX,
        y: this._dropShadowOffsetY,
        blur: this._dropShadowBlur,
        color: this._dropShadowColor,
      });
    }
  }

  blur() {
    if (typeof this._blur === 'number') {
      blur(this._blur);
    }
  }

  // background() {
  //   if (this._background && this._backgroundVisible) {
  //     push();
  //     resetAppearance();
  //     if (this._backgroundBorder && this._backgroundBorderVisible) {
  //       stroke(this._backgroundBorderColor);
  //       strokeWeight(this._backgroundBorderWeight);
  //     }
  //     exRect(this._vector, textWidth(this._string), this._size, { color: this._backgroundColor });
  //     pop();
  //   }
  // }

  fill() {
    if (this._color === false) {
      noFill();
    } else if (typeof this._color === 'string') {
      fill(this._color);
    } else if (typeof this._color === 'number') {
      fill(this._color);
    } else if(implementsColor(this._color)) {
      fill(this._color);
    }
  }

  stroke() {
    if (this._border && this._borderVisible) {
      strokeWeight(this._borderWeight);
      stroke(this._borderColor);
    } else {
      noStroke();
    }
  }

  appearance() {
    this.dropShadow();
    this.blur();
    this.fill();
    this.stroke();
  }

  shape() {
    if (typeof this._size === 'number') {
      this.callback(0, 0, this._size);
    } else if (typeof this._size === 'object') {
      this.callback(0, 0, this._size.width, this._size.height);
    }
  }

  draw() {
    push();
    this.align();
    this.rotate();
    // this.background();
    this.appearance();
    this.shape();
    pop();
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
  options?: PrimitiveOptions
) => {
  /* options */
  const _string = string ?? 'p5Ex',
    _vector = vector ?? createVector(width / 2, height / 2),
    _size = size ?? 16,
    _color = options?.color ?? color(0),
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
    if (_backgroundBorder && _backgroundBorderVisible) {
      stroke(_backgroundBorderColor);
      strokeWeight(_backgroundBorderWeight);
    }
    // exRect(_vector, textWidth(_string), _size, { color: _backgroundColor });
    pop();
  }

  // fill(_color);

  if (_dropShadow && _dropShadowVisible) {
    dropShadow({
      x: _dropShadowOffsetX,
      y: _dropShadowOffsetY,
      blur: _dropShadowBlur,
      color: _dropShadowColor,
    });
  }

  if (typeof _blur === 'number') {
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

export const exRect = (vector: p5.Vector, size: Size, options?: PrimitiveOptions) => {
  new PrimitiveShape(rect, vector, size, options).draw();
};
// export const exRect = (
//   vector: p5.Vector,
//   width: number,
//   height: number,
//   options?: {
//     color: any;
//     border?: Border;
//     dropShadow?: DropShadow;
//     rotate?: boolean | number;
//     rectMode?: CENTER | CORNER;
//   }
// ) => {
//   const defaultOptions = {
//     color: 0,
//     border: {
//       visible: false,
//       color: 1,
//       weight: 2,
//     },
//     dropShadow: {
//       visible: false,
//       offset: {
//         x: 4,
//         y: 4,
//       },
//       blur: 4,
//       color: 1,
//     },
//     rotate: false,
//     rectMode: CORNER,
//   };

//   const useOptions = { ...defaultOptions, ...options };

//   push();

//   rectMode(useOptions.rectMode);
//   if (typeof useOptions.rotate === 'number') {
//     rotateCenter(vector, useOptions.rotate);
//   }

//   if (useOptions.dropShadow.visible) {
//     dropShadow({
//       x: useOptions.dropShadow.offset.x,
//       y: useOptions.dropShadow.offset.y,
//       blur: useOptions.dropShadow.blur,
//       color: useOptions.dropShadow.color,
//     });
//   }

//   if (typeof useOptions.color === 'string') {
//     fill(useOptions.color);
//   } else {
//     fill(useOptions.color);
//   }

//   noStroke();
//   useOptions.border.visible &&
//     stroke(useOptions.border.color) &&
//     strokeWeight(useOptions.border.weight);

//   rect(0, 0, width, height);

//   pop();
// };

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
