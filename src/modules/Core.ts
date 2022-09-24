import { dropShadow, rotateCenter, resetAppearance, blur } from './Function';
import { exTranslate, exRect } from './Extension';
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

/**
 * @class PrimitiveShape
 * rect, ellipse, triangleの拡張用のコアクラス
 */
export class PrimitiveShape {
  protected _vector: p5.Vector;
  protected _size: number | Size;
  protected _center: p5.Vector;
  protected _edgeVector: p5.Vector;
  protected _radius: number;
  protected _diameter: number;
  public _color: p5.Color | string | number | false | Gradient;
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
  public _rotate: number | boolean;
  public _blur: number | boolean;
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
    this.setProperty(this.vector, this.size, this.options);
    return this;
  }

  /**
   * プロパティをセット
   * @param {PrimitiveOptions} [options]
   * @memberof PrimitiveShape
   */
  setProperty(vector: p5.Vector, size: number | Size, options?: PrimitiveOptions): this {
    this.options = options;
    this.vector = vector;
    this.size = size;
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
    return this;
  }

  /**
   * デバッグ用
   * @memberof PrimitiveShape
   */
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
  align(): this {
    if (this._align === 'corner') {
      rectMode(CORNER);
      ellipseMode(CORNER);
    } else if (this._align === 'center') {
      rectMode(CENTER);
      ellipseMode(CENTER);
    }
    return this;
  }

  /**
   * 回転
   * @memberof PrimitiveShape
   */
  rotate(): this {
    if (this._rotate && typeof this._rotate !== 'boolean') {
      rotateCenter(this._vector, this._rotate);
    } else {
      exTranslate(this._vector);
    }
    return this;
  }

  /**
   * シアー
   * @memberof PrimitiveShape
   */
  shear(): this {
    if (this._shear) {
      shearX(this._shearX);
      shearY(this._shearY);
    }
    return this;
  }

  /**
   * 変形・座標変換
   * @memberof PrimitiveShape
   */
  transform(): this {
    this.rotate();
    this.shear();
    return this;
  }

  /**
   * シャドウ
   * @memberof PrimitiveShape
   */
  dropShadow(): this {
    if (this._dropShadow && this._dropShadowVisible) {
      dropShadow({
        x: this._dropShadowOffsetX,
        y: this._dropShadowOffsetY,
        blur: this._dropShadowBlur,
        color: this._dropShadowColor,
      });
    }
    return this;
  }

  /**
   * ぼかし
   * @memberof PrimitiveShape
   */
  blur(): this {
    if (typeof this._blur === 'number') {
      blur(this._blur);
    }
    return this;
  }

  /**
   * グラデーションのセッティング
   * @memberof PrimitiveShape
   */
  gradientSetting(colorStops: ColorStop[], rad: number): this {
    if (!implementsGradient(this._color)) return;

    const addColorStop = (gradient: any, colorStops: ColorStop[]) => {
      colorStops.forEach(colorStop => {
        gradient.addColorStop(colorStop[0], colorStop[1]);
      });
    };

    let oppositeRad, gradientPoint, gradient;

    if (this._color.type === 'linear') {
      oppositeRad = rad + PI;
      gradientPoint = {
        start: createVector(
          this._center.x + this._radius * cos(rad),
          this._center.y + this._radius * sin(rad)
        ),
        end: createVector(
          this._center.x + this._radius * cos(oppositeRad),
          this._center.y + this._radius * sin(oppositeRad)
        ),
      };
      gradient = drawingContext.createLinearGradient(
        gradientPoint.start.x,
        gradientPoint.start.y,
        gradientPoint.end.x,
        gradientPoint.end.y
      );
    } else if (this._color.type === 'radial') {
      gradientPoint = {
        start: createVector(this._center.x, this._center.y),
        end: createVector(this._center.x, this._center.y),
      };
      gradient = drawingContext.createRadialGradient(
        gradientPoint.start.x,
        gradientPoint.start.y,
        0,
        gradientPoint.end.x,
        gradientPoint.end.y,
        this._diameter
      );
    } else if(this._color.type === 'conic') {
      gradientPoint = {
        center: createVector(this._center.x, this._center.y),
      };
      gradient = drawingContext.createConicGradient(
        rad,
        gradientPoint.center.x,
        gradientPoint.center.y,
      );
    }

    addColorStop(gradient, colorStops);
    drawingContext.fillStyle = gradient;

    return this;
  }

  /**
   * 塗り
   * @memberof PrimitiveShape
   */
  fill(): this {
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
    return this;
  }

  /**
   * 線
   * @memberof PrimitiveShape
   */
  stroke(): this {
    if (this._border && this._borderVisible) {
      strokeWeight(this._borderWeight);
      stroke(this._borderColor);
    } else {
      noStroke();
    }
    return this;
  }

  /**
   * 見た目
   * @memberof PrimitiveShape
   */
  appearance(): this {
    this.dropShadow();
    this.blur();
    this.stroke();
    this.fill();
    return this;
  }

  /**
   * 形
   * @memberof PrimitiveShape
   */
  shape(): this {
    if (typeof this._size === 'number') {
      this.callback(0, 0, this._size);
    } else if (typeof this._size === 'object') {
      this.callback(0, 0, this._size.width, this._size.height);
    }
    return this;
  }

  /**
   * 描画
   * @memberof PrimitiveShape
   */
  draw(): this {
    push();
    this.align();
    this.transform();
    this.appearance();
    this.shape();
    pop();
    return this;
  }
}

export class Text extends PrimitiveShape {
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

  shape(): this {
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
    return this;
  }

  draw(): this {
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
