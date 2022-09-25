// @ts-ignore
import p5 from 'P5';
import { PrimitiveShape, Text } from './Core';
import {
  TypeOptions,
  Size,
  PrimitiveOptions,
} from '../@types/global';

/**
 * rect()の拡張
 * @param vector - ベクトル
 * @param size - サイズ
 * @param options - オプション
 */
 export const exRect = (
  vector?: p5.Vector,
  size?: Size,
  options?: PrimitiveOptions
): PrimitiveShape => {
  return new PrimitiveShape(rect, vector, size, options).draw();
};

/**
 * ellipse()の拡張
 * @param vector - ベクトル
 * @param diameter - 直径
 */
 export const exEllipse = (
  vector?: p5.Vector,
  size?: Size,
  options?: PrimitiveOptions
): PrimitiveShape => new PrimitiveShape(ellipse, vector, size, options).draw();

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
  string?: string,
  vector?: p5.Vector,
  size?: number,
  options?: PrimitiveOptions & TypeOptions
) => {
  new Text(string, vector, size, options).draw();
};

/**
 * triangle()の拡張
 * @param vector1 - ベクトル1
 * @param vector2 - ベクトル2
 * @param vector3 - ベクトル3
 */
export const exTriangle = (vector1: p5.Vector, vector2: p5.Vector, vector3: p5.Vector) =>
  triangle(vector1.x, vector1.y, vector2.x, vector2.y, vector3.x, vector3.y);

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
 * translate()の拡張
 * @param vector - ベクトル
 */
export const exTranslate = (vector: p5.Vector) => translate(vector.x, vector.y);
