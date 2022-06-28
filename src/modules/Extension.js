/**
 * extension of line
 */
export const exLine = (vector1, vector2) => line(vector1.x, vector1.y, vector2.x, vector2.y);

/**
 * extension of text
 */
export const exText = (vector, str) => text(str, vector.x, vector.y);

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
