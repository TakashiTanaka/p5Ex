/**
 * @jest-environment jsdom
 */

import { makeDivNumber, normalize0to1, randomInt } from './../src/modules/Function';

test('makeDivNumber/分割数指定', () => {
  expect(makeDivNumber(10)).toEqual([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]);
});

test('normalize0to1/正規化', () => {
  expect(normalize0to1(-0.5)).toBe(0.5);
  expect(normalize0to1(1.5)).toBe(0.5);
});

test('randomInt/範囲内かテスト', () => {
	const num = randomInt(1,5);
	expect(num).toBeGreaterThanOrEqual(1);
	expect(num).toBeLessThanOrEqual(5);
});
