import { dropShadow, rotateCenter, resetAppearance, blur } from './Function';
import type p5 from 'p5';

function implementsColor(arg: any): arg is typeof Color {
  return arg !== null && typeof arg === 'object';
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

type HorizAlign = typeof LEFT | typeof CENTER | typeof RIGHT;

type VertAlign = typeof TOP | typeof BOTTOM | typeof CENTER;

type TypeAlign = {
  horiz: HorizAlign,
  vert?: VertAlign | typeof BASELINE,
};

type PrimitiveOptions = {
  color?: p5.Color | number | string | false;
  align?: Align;
  background?: Background;
  dropShadow?: DropShadow;
  rotate?: boolean | number;
  blur?: boolean | number;
  border?: Border;
};

type TypeOptions = {
  font?: string;
  typeAlign?: TypeAlign;
  letterSpacing?: number;
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
    public callback: typeof rect | typeof ellipse,
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
    if (this._align === 'corner') {
      rectMode('corner');
    } else if (this._align === 'center') {
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

  fill() {
    if (this._color === false) {
      noFill();
    } else if (typeof this._color === 'string') {
      fill(this._color);
    } else if (typeof this._color === 'number') {
      fill(this._color);
    } else if (implementsColor(this._color)) {
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
    this.appearance();
    this.shape();
    pop();
  }
}

class Text extends PrimitiveShape {
  public _string: string;
  public _font: string;
  public _typeAlign: TypeAlign | boolean;
  public _typeAlignHoriz: HorizAlign;
  public _typeAlignVert: VertAlign | typeof BASELINE | false;
  public _letterSpacing: number;

  constructor(
    public string: string,
    public vector: p5.Vector,
    public size: number,
    public options?: PrimitiveOptions & TypeOptions,
  ) {
    super(text, vector, size, options);
    this._string = string;
    this._font = this.options?.font ?? 'serif';
    this._typeAlign = this.options?.typeAlign ?? false;
    this._typeAlignHoriz = this.options?.typeAlign?.horiz ?? LEFT;
    this._typeAlignVert = this.options?.typeAlign?.vert ?? false;
    this._letterSpacing = this.options?.letterSpacing;
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
          createVector(0,0),
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
      if(this._typeAlignVert) {
        textAlign(this._typeAlignHoriz, this._typeAlignVert);
      } else {
        textAlign(this._typeAlignHoriz);
      }
      // set letterSpacing
      if(typeof this._letterSpacing === 'number') {
        drawingContext.letterSpacing = `${this._letterSpacing}px`;
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
  new PrimitiveShape(rect, vector, size, options).draw();
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
