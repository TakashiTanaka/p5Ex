import { Gradient } from '../@types/global';

/**
 * Color型用の型ガード関数
 * @param arg 判定したい値
 * @return arg is typeof Color
 */
export const isColor = (arg: unknown): arg is typeof Color => {
  return arg !== null && typeof arg === 'object';
};

/**
 * Gradient用の型ガード関数
 * @param arg 判定したい値
 * @return arg is Gradient
 */
export const isGradient = (arg: unknown): arg is Gradient => {
  return arg !== null && typeof arg === 'object' && 'colorStops' in arg;
};
