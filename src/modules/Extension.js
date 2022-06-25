export const exLine = (vector1, vector2) => line(vector1.x, vector1.y, vector2.x, vector2.y);

export const exText = (str, vector) => text(str, vector.x, vector.y);

export const exCircle = (vector, diameter) => circle(vector.x, vector.y, diameter);

export const exRect = (vector, width, height) => rect(vector.x, vector.y, width, height);

export const exPoint = () => point(vector.x, vector.y);
