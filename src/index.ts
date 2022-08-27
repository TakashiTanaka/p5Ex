import * as extension from './modules/Extension';
import * as object from './modules/Object';
import * as func from './modules/Function';
import * as utility from './modules/Utility';

export const Extension = extension;
export const Object = object;
export const Function = func;
export const Utility = utility;

// // モジュールをグローバルオブジェクト化する関数
// const convertModulesToWindowObject = modules =>
//   Object.entries(modules).forEach(module => (window[module[0]] = module[1]));

// [Extension, Obj, Func, Util].forEach(module => convertModulesToWindowObject(module));

