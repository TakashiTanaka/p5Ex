import { MaxNum } from './../@types/global';
// @ts-ignore
import p5 from 'P5';
import { BigNumber } from 'bignumber.js';
// import _ from 'lodash';
import { exTranslate } from './Extension';
import { MinNum, RandomRange, GridOptions } from '../@types/global';

/**
 * 画面領域一杯のカンバスを作成する
 * @returns createCanvas(windowWidth, windowHeight)
 */
export const createFullCanvas = (): p5.Renderer => createCanvas(windowWidth, windowHeight);

/**
 * ブラー
 * @param amount - ブラー量
 * 
 * @example <caption>使用例</caption>
 * blur(20);
 * // 20pxのブラー
 */
export const blur = (amount: number):void => {
  drawingContext.filter = `blur(${amount}px)`;
};

/**
 * ドロップシャドウ
 * @param options - オプション
 */
export const dropShadow = (options: {
  x?: number;
  y?: number;
  blur?: number;
  color?: string | p5.Color;
}):void => {
  const _x = options?.x ?? 4,
    _y = options?.y ?? 4,
    _blur = options?.blur ?? 4,
    _color = options?.color ?? 'black';
  drawingContext.shadowOffsetX = _x;
  drawingContext.shadowOffsetY = _y;
  drawingContext.shadowBlur = _blur;
  drawingContext.shadowColor = _color;
};

/**
 * ランダムな整数値を得る（引数の値も範囲に含む）
 * @param min 最小値
 * @param max 最大値
 * @return ランダムな整数値
 */
export const randomInt = (min: MinNum, max: MaxNum): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * ランダムな色を返す関数
 */
export const randomColor = (): p5.Color => color(random(), random(), random());

/**
 * コールバック関数を指定回数繰り返す
 * @param count 繰り返す回数（整数）
 * @param callback コールバック関数
 */
export const iterator = (count: number, callback: (i?: number) => void):void => {
  for (let i = 0; i < count; i++) {
    callback(i);
  }
};

/**
 * X座標の中心を返す関数
 * @returns X座標の中心
 */
export const centerX = (): number => width / 2;

/**
 * Y座標の中心を返す関数
 * @returns Y座標の中心
 */
export const centerY = (): number => height / 2;

/**
 * 引数で受け取ったベクトル間を補完して、配列で返す
 * @param {p5.Vector[]} vectors p5.Vector型の値を格納している配列
 * @param {number} interval ベクトル間の間隔を整数値で指定
 * @param {boolean} isClose 始点と終点のパスを補完するかしないか
 * @return {p5.Vector[][]} lerp vectors
 */
export const lerpVectors = (vectors: p5.Vector[], interval = 16, isClose = false) => {
  return vectors.map((vector, i, parent) => {
    if (isClose === false && i + 1 === parent.length) return [];

    const v = {
      current: vector,
      next: i + 1 === parent.length ? parent[0] : parent[i + 1],
    };

    // @ts-ignore
    const distance = (p5.Vector.dist(v.current, v.next) * canvasSize) / interval;

    // @ts-ignore
    const lerpPaths = [];

    // @ts-ignore
    iterator(floor(distance), i => {
      // @ts-ignore
      const m = map(i, 0, floor(distance), 0, 1);
      const lerpValue = p5.Vector.lerp(v.current, v.next, m);
      // @ts-ignore
      lerpPaths.push(lerpValue.mult(canvasSize));
    });

    // @ts-ignore
    return lerpPaths;
  });
};

/**
 * オブジェクトの中央で回転
 * @param vector ベクトル
 * @param radian 弧度
 */
export const rotateCenter = (vector: p5.Vector, radian: number = 0):void => {
  exTranslate(vector);
  rotate(radian);
  push();
  exTranslate(vector.mult(-1));
  pop();
};

/**
 * 1を指定した数・ランダム値で分割し、その数値を配列で返す
 * @param divNum 分割数もしくはランダム関数の引数として与える[最小値, 最大値]の配列
 * @return 0-1（1を含まない）の範囲の数値を含んだ配列
 * 
 * @example <caption>分割数指定</caption>
 * const array = makeDivNumber(10);
 * console.log(array);
 * // [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
 * @example <caption>ランダム値指定</caption>
 * const array = makeDivNumber([0.01, 0.2]);
 * console.log(array);
 * // [0, 0.014458812570205041, 0.19277494284540855, 0.32684184528959026, 0.4408893570803207, 0.4514227402614645, 0.5117842166715277, 0.52751946036063, 0.6690020474647462, 0.7342389351259777, 0.7942026343047186, 0.9682847987666994]
 */
export const makeDivNumber = (divNum: number | RandomRange = 10): number[] => {
  let array = [];
  const maxNum = 1;
  let num = 0;
  while (num < maxNum) {
    let incrementNum;
    if (typeof divNum === 'number') {
      incrementNum = BigNumber(1).div(divNum).toNumber();
    } else {
      incrementNum = random(divNum[0], divNum[1]);
    }
    array.push(num);
    num = BigNumber(num).plus(incrementNum).toNumber();
  }
  return array;
};

/**
 * グリッドを生成し、その情報を配列で返す
 * @param xDiv x方向の分割する比率を格納した値
 * @param yDiv y方向の分割する比率を格納した値
 * @param direction 分割する基準方向（xかy）
 * @return グリッド情報を含んだ配列
 */
 export const makeGrid = (xDiv: number[] | GridOptions, yDiv: number[] | GridOptions, direction?: 'x' | 'y') => {
  const gridInfo: any[] = [];
  const _xDiv = Array.isArray(xDiv) ? xDiv : makeDivNumber([xDiv.min, xDiv.max]);
  _xDiv.forEach((xNum, xIndex, xNums) => {
    const xSubNum = xIndex !== xNums.length - 1 ? xNums[xIndex + 1] : 1;
    const _yDiv = Array.isArray(yDiv) ? yDiv : makeDivNumber([yDiv.min, yDiv.max]);
    _yDiv.forEach((yNum, yIndex, yNums) => {
      let ySubNum = yIndex !== yNums.length - 1 ? yNums[yIndex + 1] : 1;
      const info = {
        x: {
          num: xNum,
          index: xIndex,
          nums: xNums,
        },
        y: {
          num: yNum,
          index: yIndex,
          nums: yNums,
        },
        width: xSubNum - xNum,
        height: ySubNum - yNum,
      };
      if(direction && direction === 'y') {
        [info.x, info.y, info.width, info.height] = [info.y, info.x, info.height, info.width];
      }
      gridInfo.push(info);
    });
  });
  return gridInfo;
};

// フォントの初期化
const initFont = (
  size = 10,
  font = 'helvetica-light',
  horizAlign = LEFT,
  vertAlign = TOP,
  leading = 1.5
) => {
  textSize(size);
  textFont(font);
  textAlign(horizAlign, vertAlign);
  textLeading(leading);
};

// 等間隔の線分を描く
const drawEqDivLine = (beginXPos: number, endXPos: number, divNum: number, firstYpos: number, secondYpos: number) => {
  iterator(divNum, count =>
    line(
      beginXPos + (endXPos / divNum) * count,
      firstYpos,
      endXPos / divNum + (endXPos / divNum) * count,
      secondYpos
    )
  );
};

// 繰り返しのテキストを描く
const drawRepeatText = (str: string, textColor: p5.Color) => {
  const fontSize = windowWidth / 80;
  initFont(fontSize);
  const msg = str;
  const msgWidth = textWidth(msg);
  const margin = msgWidth / 5;

  fill(textColor);

  iterator(floor(width / msgWidth), columnCount =>
    iterator(floor(height / fontSize), rowCount =>
      text(msg, columnCount * (msgWidth + margin), rowCount * (fontSize + margin))
    )
  );
};

// 原点を設定する
const setOrigin = (originX:number, originY:number, beforeFunc: () => void, afterFunc: () => void) => {
  translate(originX, originY);
  push();
  beforeFunc();
  translate(-originX, -originY);
  afterFunc();
  pop();
};

// テキストをカーニング指定して表示
const kerningText = (word: string, value: number, y: number) => {
  const wordSplitter = (word: string) => word.split('');
  const chars = wordSplitter(word);
  chars.forEach((char, n) => {
    text(char, n * value, y);
  });
};

/**
 * グリッドレイアウトに使用できる関数
 * コールバック関数を各ループで実行
 * @param { { count:{x: number, y: number}, fn: function(x, y) } } [options={count, fn}]
 */
// const gridLayout = (options = {}) => {
//   const { count, fn } = options;
//   iterator(count.x, x => {
//     iterator(count.y, y => {
//       fn(x, y);
//     });
//   });
// };

/**
 * 引数にとった値のどちらかを返す関数
 * @param arg1 引数1
 * @param arg2 引数2
 * @return arg1, arg2のどちらか
 */
export const whichValue = (arg1: any, arg2: any): any => {
  return randomInt(0, 1) ? arg1 : arg2;
};

/**
 * 引数にとった値のどれかを返す関数
 * @param args ...引数
 * @returns 引数内のいずれか
 */
export const anyValue = (...args: any[]): any => args[randomInt(0, args.length - 1)];

// ランダムな直角二等辺三角形を描く
// const isoscelesRightTriangle = (x:number, y:number, size:number) => {
//   const randomPoints = shuffle([
//     { x: x, y: y },
//     { x: x + size, y: y },
//     { x: x + size, y: y + size },
//     { x: x, y: y + size },
//   ]);
//   triangle(
//     randomPoints[0].x,
//     randomPoints[0].y,
//     randomPoints[1].x,
//     randomPoints[1].y,
//     randomPoints[2].x,
//     randomPoints[2].y
//   );
// };

/**
 * もし0未満か1超過だったら正規化した値を返す
 * @param num 数値
 * @return 0-1に正規化された数値
 * 
 * @example <caption>0未満の値</caption>
 * const num = normalize0to1(-0.5);
 * console.log(num);
 * // 0.5
 * @example <caption>1超過の値</caption>
 * const num = normalize0to1(1.5);
 * console.log(num);
 * // 0.5
 */
 export const normalize0to1 = (num: number): number => {
  if (num > 1) {
    return normalize0to1(num - 1);
  } else if (num < 0) {
    return normalize0to1(num + 1);
  }
  return num;
};

/**
 * アルファベットの配列を作成する関数
 * @return アルファベットの配列
 */
const mkAlphabetArray = (): string[] => {
  let alphabet = [],
    startUnicode = 65,
    endUnicode = 90,
    counter = startUnicode;
  for (let i = 0; i < endUnicode + 1 - startUnicode; i++) {
    alphabet[i] = char(counter).toUpperCase();
    counter++;
  }
  return alphabet;
};

/**
 * ランダムなアルファベットを返す関数
 */
export const randomAlphabet = (): string => {
  let alphabets = mkAlphabetArray();
  return alphabets[randomInt(0, alphabets.length - 1)];
};

/**
 * strokeとfillをリセットする関数
 */
export const resetAppearance = () => {
  noStroke();
  noFill();
};

/**
 * undefinedか判定
 */
export const isUndefined = (value: any): boolean => {
  return value === void 0;
};

/**
 * オプション値の初期値を設定
 */
export const initArgument = (value: any): any => {
  return value === void 0;
};
