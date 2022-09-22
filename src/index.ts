import * as ext from './modules/Extension';
import * as obj from './modules/Object';
import * as func from './modules/Function';
import * as util from './modules/Utility';

// @ts-ignore
import p5 from 'P5';

/**
 * 親となるclass
 * 名前空間のような使用方法をしている
 * @class P5ex
 */
 export class P5ex {
  public ext;
  public obj;
  public func;
  public util;

  constructor() {
    this.ext = ext;
    this.obj = obj;
    this.func = func;
    this.util = util;
  }
}

// p5の名前空間内のインタフェース、p5InstanceExtensionsにメソッドの型を追加することでプロトタイプ拡張
// @ts-ignore
declare module 'P5' {
  export interface p5InstanceExtensions {
    P5ex: P5ex;
  }  
}

// グローバルにp5が定義されていたら、
// p5exをp5のprototypeに追加する
if (p5) {
  p5.prototype.P5ex = new P5ex();
} else {
  console.warn('p5 is not found...');
}