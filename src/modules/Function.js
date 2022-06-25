/**
 * 画面領域一杯のカンバスを作成する
 */
export const createFullCanvas = () => createCanvas(windowWidth, windowHeight);

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