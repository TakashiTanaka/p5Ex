// @ts-nocheck

/**
 * 画面領域一杯のカンバスを作成する
 * @returns {function} createCanvas(windowWidth, windowHeight)
 */
export const createFullCanvas = () => createCanvas(windowWidth, windowHeight);

/**
 * ドロップシャドウ
 * @param options - オプション
 */
export const dropShadow = ({
  x = 4,
  y = 4,
  blur = 4,
  color = 'black',
}: {
  x: number;
  y: number;
  blur: number;
  color: number | string;
}) => {
  drawingContext.shadowOffsetX = x;
  drawingContext.shadowOffsetY = y;
  drawingContext.shadowBlur = blur;
  drawingContext.shadowColor = color;
};

/**
 * ランダムな整数値を得る（引数の値も範囲に含む）
 * @param {number} min 最小値
 * @param {number} max 最大値
 * @return {number} ランダムな整数値
 */
export const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * コールバック関数を指定回数繰り返す
 * @param {number} count 繰り返す回数（整数）
 * @param {function} fn コールバック関数
 */
export const iterator = (count, fn) => {
  for (let i = 0; i < count; i++) {
    fn(i);
  }
};

/**
 * X座標の中心を返す関数
 * @returns number
 */
export const centerX = () => width / 2;

/**
 * Y座標の中心を返す関数
 * @returns number
 */
export const centerY = () => height / 2;

/**
 * 引数で受け取ったベクトル間を補完して、配列で返す
 * @param {p5.Vector[]} vectors p5.Vector型の値を格納している配列
 * @param {number} interval ベクトル間の間隔を整数値で指定
 * @param {boolean} isClose 始点と終点のパスを補完するかしないか
 * @return {p5.Vector[][]} lerp vectors
 */
export const lerpVectors = (vectors, interval = 16, isClose = false) => {
  return vectors.map((vector, i, parent) => {
    if (isClose === false && i + 1 === parent.length) return [];

    const v = {
      current: vector,
      next: i + 1 === parent.length ? parent[0] : parent[i + 1],
    };

    const distance = (p5.Vector.dist(v.current, v.next) * canvasSize) / interval;

    const lerpPaths = [];

    iterator(floor(distance), i => {
      const m = map(i, 0, floor(distance), 0, 1);
      const lerpValue = p5.Vector.lerp(v.current, v.next, m);
      lerpPaths.push(lerpValue.mult(canvasSize));
    });

    return lerpPaths;
  });
};

// グリッドを描く
const drawGrid = unitSize => {
  const iterator = (iNum, func) => {
    for (let count = iNum; count--; ) {
      func(count);
    }
  };
  iterator(ceil(width / unitSize), count => {
    line(count * unitSize, 0, count * unitSize, height);
    line(0, count * unitSize, width, count * unitSize);
  });
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
const drawEqDivLine = (beginXPos, endXPos, divNum, firstYpos, secondYpos) => {
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
const drawRepeatText = (str, textColor) => {
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

// サインの値を返す
const fSin = (base, strength, angle) => base + strength * sin(angle);

// コサインの値を返す
const fCos = (base, strength, angle) => base + strength * cos(angle);

// 原点を設定する
const setOrigin = (originX, originY, beforeFunc, afterFunc) => {
  translate(originX, originY);
  push();
  beforeFunc();
  translate(-originX, -originY);
  afterFunc();
  pop();
};

// テキストをカーニング指定して表示
const kerningText = (word, value, y) => {
  const wordSplitter = word => word.split('');
  const chars = wordSplitter(word);
  chars.forEach((char, n) => {
    text(char, n * value, y);
  });
};

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    // ランダムな数値（キーとして使用）を取得
    let j = Math.floor(Math.random() * (i + 1));
    // 元配列のi番目と元配列のj番目を入れ替える
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * グリッドレイアウトに使用できる関数
 * コールバック関数を各ループで実行
 * @param { { count:{x: number, y: number}, fn: function(x, y) } } [options={count, fn}]
 */
const gridLayout = (options = {}) => {
  const { count, fn } = options;
  iterator(count.x, x => {
    iterator(count.y, y => {
      fn(x, y);
    });
  });
};

// テキストの描写
const cText = ({
  text,
  size,
  position,
  fillColor,
  strokeColor: { fill, color },
  rotate = { isRotate: false, degree: 0, angleMode: DEGREES },
}) =>
  // text: string,
  // size = 16,
  // position = { x: 0, y: 0 },
  // fillColor = { fill: true, color: 0 },
  // strokeColor: { fill: boolean, color: p5.Color } = {
  //   fill: true,
  //   color: 255,
  // },
  // rotate = { isRotate: false, degree: 0, angleMode: DEGREES }}
  {
    push();
    if (rotate.isRotate) {
      translate(position.x, position.y);
      angleMode(rotate.angleMode);
      rotate(rotate.degree);
      translate(-position.x, -position.y);
    }
    if (!fillColor.fill) noFill();
    else fill(fillColor.color);
    if (!strokeColor.fill) noStroke();
    else stroke(strokeColor.color);
    textSize(size);
    text(text, position.x, position.y);
    pop();
  };

/**
 * 引数にとった値のどちらかを返す関数
 * @param { any } arg1
 * @param { any } arg2
 * @return { any }
 */
const whichValue = (arg1, arg2) => {
  if (randomInt(0, 1)) {
    return arg1;
  } else {
    return arg2;
  }
};

/**
 * 引数にとった値のどれかを返す関数
 * @param { any } args
 * @returns { any }
 */
const anyValue = (...args) => args[randomInt(0, args.length - 1)];

// ランダムな直角二等辺三角形を描く
const isoscelesRightTriangle = (x, y, size) => {
  const randomPoints = shuffle([
    { x: x, y: y },
    { x: x + size, y: y },
    { x: x + size, y: y + size },
    { x: x, y: y + size },
  ]);
  triangle(
    randomPoints[0].x,
    randomPoints[0].y,
    randomPoints[1].x,
    randomPoints[1].y,
    randomPoints[2].x,
    randomPoints[2].y
  );
};

// もし0未満か360超過だったら正規化した値を返す
const normalizeHSB = hue => {
  if (hue > 360) {
    return normalizeHSB(hue - 360);
  } else if (hue < 0) {
    return normalizeHSB(hue + 360);
  }
  return hue;
};

/**
 * アルファベットの配列を作成する関数
 * @return { Array }
 */
const mkAlphabetArray = () => {
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
 * @return { String }
 */
const randomAlphabet = () => {
  let alphabets = mkAlphabetArray();
  return alphabets[randomInt(0, alphabets.length - 1)];
};
