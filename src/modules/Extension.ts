// @ts-nocheck

/**
 * extension of line
 * @param { p5.Vector } vector1 - ベクター1
 * @param { p5.Vector } vector2 - ベクター2
 */
export const exLine = (vector1, vector2) => line(vector1.x, vector1.y, vector2.x, vector2.y);

/**
 * extension of text
 * @param {string} string
 * @param {p5.Vector} vector
 * @param {number} size
 * @param {{
 *     align: 'corner' | 'center',
 *     background: {
 *       visible: boolean,
 *       color: p5.Color,
 *       border: {
 *         visible: boolean,
 *         color: p5.Color,
 *         weight: number,
 *       },
 *     },
 *   }} options
 */
export const exText = (
  string,
  vector,
  size,
  options = {
    align: 'corner',
    background: {
      visible: false,
      color: 0,
      border: {
        visible: false,
        color: 1,
        weight: 2,
      },
    },
  }
) => {
  const isAlignCorner = options.align === 'corner';
  textSize(size);
  const align = isAlignCorner ? CORNER : CENTER;
  textAlign(isAlignCorner ? LEFT : CENTER, isAlignCorner ? TOP : CENTER);
  rectMode(align);
  if (options.background.visible) {
    push();
    noStroke();
    options.background.border.visible &&
      stroke(options.background.border.color) &&
      strokeWeight(options.background.border.weight);
    fill(options.background.color);
    exRect(vector, textWidth(string), size);
    pop();
  }
	text(string, vector.x, vector.y)
};


/**
 * extension of circle
 */
export const exCircle = (vector, diameter) => circle(vector.x, vector.y, diameter);

/**
 * extension of triangle
 */
export const exTriangle = (vector1, vector2, vector3) =>
triangle(vector1.x, vector1.y, vector2.x, vector2.y, vector3.x, vector3.y);

/**
 * extension of rect
 */
export const exRect = (vector, width, height) => rect(vector.x, vector.y, width, height);

/**
 * extension of point
 */
export const exPoint = vector => point(vector.x, vector.y);

/**
 * extension of vertex
 */
export const exVertex = vector => vertex(vector.x, vector.y);

/**
 * extension of curveVertex
 */
export const exCurveVertex = vector => curveVertex(vector.x, vector.y);
