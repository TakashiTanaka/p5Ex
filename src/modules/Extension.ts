import { dropShadow, rotateCenter, resetAppearance, blur } from './Function';
// @ts-ignore
import p5 from 'P5';

import {
  Border,
  DropShadow,
  Gradient,
  Size,
  Align,
  Background,
  PrimitiveOptions,
  ColorStop,
  TypeAlign,
  HorizAlign,
  VertAlign,
  TypeOptions,
  Shear,
} from '../@types/global';

function implementsColor(arg: any): arg is typeof Color {
  return arg !== null && typeof arg === 'object';
}

function implementsGradient(arg: any): arg is Gradient {
  return arg !== null && typeof arg === 'object' && 'colorStops' in arg;
}

// @ts-nocheck

/**
 * @class PrimitiveShape
 * rect, ellipse, triangleの拡張用クラス
 */
export class PrimitiveShape {
  protected _vector: p5.Vector;
  protected _size: number | Size;
  protected _center: p5.Vector;
  protected _edgeVector: p5.Vector;
  protected _radius: number;
  protected _diameter: number;
  protected _color: p5.Color | string | number | false | Gradient;
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
  protected _shear: Shear | boolean;
  protected _shearX: number;
  protected _shearY: number;

  constructor(
    public callback: typeof rect | typeof ellipse,
    public vector: p5.Vector,
    public size: number | Size,
    public options?: PrimitiveOptions
  ) {
    this.options = options;
    this._vector = this.vector ?? createVector(width / 2, height / 2);
    this._align = this.options?.align ?? 'corner';
    this._size = this.size ?? 16;
    this._color = this.options?.color ?? 'black';
    this._center = this._align === 'center' ? createVector(0, 0) : this.calcCenter();
    this._edgeVector = this.calcEdgeVector();
    this._radius = p5.Vector.dist(this._edgeVector, this._center);
    this._diameter = this._radius * 2;
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
    this._shear = this.options?.shear ?? false;
    this._shearX = this.options?.shear?.x ?? 0;
    this._shearY = this.options?.shear?.y ?? 0;
  }

  debug() {
    console.dir(this);
  }

  /**
   * オブジェクトの左上（左角）のベクトルを計算
   * @memberof PrimitiveShape
   */
  calcEdgeVector(): p5.Vector {
    if (this._align === 'center') {
      return typeof this._size === 'number'
        ? createVector(-this._size / 2, -this._size / 2)
        : createVector(-this._size.width / 2, -this._size.height / 2);
    } else {
      return createVector(0, 0);
    }
  }

  /**
   * 中心点を計算
   * @memberof PrimitiveShape
   */
  calcCenter(): p5.Vector {
    return typeof this._size === 'number'
      ? createVector(this._size / 2, this._size / 2)
      : createVector(this._size.width / 2, this._size.height / 2);
  }

  /**
   * 原点位置
   * @memberof PrimitiveShape
   */
  align() {
    if (this._align === 'corner') {
      rectMode('corner');
    } else if (this._align === 'center') {
      rectMode('center');
    }
  }

  /**
   * 回転
   * @memberof PrimitiveShape
   */
  rotate() {
    if (this._rotate && typeof this._rotate !== 'boolean') {
      rotateCenter(this._vector, this._rotate);
    } else {
      exTranslate(this._vector);
    }
  }

  /**
   * シアー
   * @memberof PrimitiveShape
   */
  shear() {
    if (this._shear) {
      shearX(this._shearX);
      shearY(this._shearY);
    }
  }

  /**
   * 変形・座標変換
   * @memberof PrimitiveShape
   */
  transform() {
    this.rotate();
    this.shear();
  }

  /**
   * シャドウ
   * @memberof PrimitiveShape
   */
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

  /**
   * ぼかし
   * @memberof PrimitiveShape
   */
  blur() {
    if (typeof this._blur === 'number') {
      blur(this._blur);
    }
  }

  /**
   * グラデーションのセッティング
   * @memberof PrimitiveShape
   */
  gradientSetting(colorStops: ColorStop[], rad: number) {
    const oppositeRad = rad + PI;

    const gradientPoint = {
      start: createVector(
        this._center.x + this._radius * cos(rad),
        this._center.y + this._radius * sin(rad)
      ),
      end: createVector(
        this._center.x + this._radius * cos(oppositeRad),
        this._center.y + this._radius * sin(oppositeRad)
      ),
    };

    const gradient = drawingContext.createLinearGradient(
      gradientPoint.start.x,
      gradientPoint.start.y,
      gradientPoint.end.x,
      gradientPoint.end.y
    );

    const addColorStop = (gradient: any, colorStops: ColorStop[]) => {
      colorStops.forEach(colorStop => {
        gradient.addColorStop(colorStop[0], colorStop[1]);
      });
    };

    addColorStop(gradient, colorStops);

    drawingContext.fillStyle = gradient;
  }

  /**
   * 塗り
   * @memberof PrimitiveShape
   */
  fill() {
    if (this._color === false) {
      noFill();
    } else if (typeof this._color === 'string') {
      fill(this._color);
    } else if (typeof this._color === 'number') {
      fill(this._color);
    } else if (implementsGradient(this._color)) {
      this.gradientSetting(this._color?.colorStops, this._color?.rad);
    } else if (implementsColor(this._color)) {
      fill(this._color);
    }
  }

  /**
   * 線
   * @memberof PrimitiveShape
   */
  stroke() {
    if (this._border && this._borderVisible) {
      strokeWeight(this._borderWeight);
      stroke(this._borderColor);
    } else {
      noStroke();
    }
  }

  /**
   * 見た目
   * @memberof PrimitiveShape
   */
  appearance() {
    this.dropShadow();
    this.blur();
    this.stroke();
    this.fill();
  }

  /**
   * 形
   * @memberof PrimitiveShape
   */
  shape() {
    if (typeof this._size === 'number') {
      this.callback(0, 0, this._size);
    } else if (typeof this._size === 'object') {
      this.callback(0, 0, this._size.width, this._size.height);
    }
  }

  /**
   * 描画
   * @memberof PrimitiveShape
   */
  draw() {
    push();
    this.align();
    this.transform();
    this.appearance();
    this.shape();
    pop();
    return this;
  }
}

class Text extends PrimitiveShape {
  public _string: string;
  public _font: string;
  public _typeAlign: TypeAlign | boolean;
  public _typeAlignHoriz: HorizAlign;
  public _typeAlignVert: VertAlign | typeof BASELINE | false;
  public _letterSpacing: number;
  public _wordSpacing: number;

  constructor(
    public string: string,
    public vector: p5.Vector,
    public size: number,
    public options?: PrimitiveOptions & TypeOptions
  ) {
    super(text, vector, size, options);
    this._string = string;
    this._font = this.options?.font ?? 'serif';
    this._typeAlign = this.options?.typeAlign ?? false;
    this._typeAlignHoriz = this.options?.typeAlign?.horiz ?? LEFT;
    this._typeAlignVert = this.options?.typeAlign?.vert ?? false;
    this._letterSpacing = this.options?.letterSpacing;
    this._wordSpacing = this.options?.wordSpacing;
  }

  background() {
    if (this._background && this._backgroundVisible) {
      push();
      resetAppearance();
      if (this._backgroundBorder && this._backgroundBorderVisible) {
        stroke(this._backgroundBorderColor);
        strokeWeight(this._backgroundBorderWeight);
      }
      if (typeof this._size === 'number') {
        textSize(this._size);
        exRect(
          createVector(0, 0),
          { width: textWidth(this._string), height: this._size },
          { color: this._backgroundColor }
        );
      }
      pop();
    }
  }

  shape() {
    if (typeof this._size === 'number') {
      // set align
      if (this._typeAlignVert) {
        textAlign(this._typeAlignHoriz, this._typeAlignVert);
      } else {
        textAlign(this._typeAlignHoriz);
      }
      // set letterSpacing
      if (typeof this._letterSpacing === 'number') {
        drawingContext.letterSpacing = `${this._letterSpacing}px`;
      }
      // set wordSpacing
      if (typeof this._wordSpacing === 'number') {
        drawingContext.wordSpacing = `${this._wordSpacing}px`;
      }
      // set font
      textFont(this._font);
      textSize(this._size);
      text(this._string, 0, 0);
    }
  }

  draw() {
    push();
    this.align();
    this.rotate();
    this.background();
    this.appearance();
    this.shape();
    pop();
    return this;
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
  options?: PrimitiveOptions & TypeOptions
) => {
  new Text(string, vector, size, options).draw();
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
 * @param size - サイズ
 * @param options - オプション
 */
export const exRect = (vector: p5.Vector, size: Size, options?: PrimitiveOptions) => {
  return new PrimitiveShape(rect, vector, size, options).draw();
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
