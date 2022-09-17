import type p5 from 'P5';

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
  horiz: HorizAlign;
  vert?: VertAlign | typeof BASELINE;
};

type ColorStop = [number, typeof Color | string];

type Gradient = {
  type: 'linear';
  colorStops: ColorStop[];
  rad: number;
};

type PrimitiveOptions = {
  color?: p5.Color | number | string | false | Gradient;
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
  wordSpacing?: number;
};