// import debounce from './debounce'

// 浏览器中 -> window
// node vm模块 -> global
// 虚拟机中 -> this
// Web Worker -> self
// 微信小程序 -> window global 都是undefined
const ROOT = typeof self === 'object' && self.self === self && self ||
            typeof global === 'object' && global.global === global && global ||
            this ||
            {}

// 保存先前的变量_
const previousUnderscore = ROOT._

// 在压缩版中保存
const ArrayProto = Array.prototype
const ObjProto = Object.prototype
const SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null

// 创建快速访问核心原型的变量
const push = ArrayProto.push
const slice = ArrayProto.slice
const toString = ObjProto.toString
const hasOwnProperty = ObjProto.hasOwnProperty

// ESMAScript 5 函数
const nativeIsArray = Array.isArray
const nativeKeys = Object.keys
const nativeCreate = Object.create

// 创建对_安全的引用
const _ = (obj) => {
    if (obj instanceof _) {
        return obj
    }
    if (!(this instanceof _)) {
        return new _(obj)
    }
    this._wrapped = obj
}

// 导出nodejs中的_对象，向后兼容
// 在浏览器中设置全局
if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
        exports = module.exports = _
    }
    exports._ = _
} else {
    ROOT._ = _
}

_.VERSION = '0.0.0'

console.log(_.VERSION)

// window._ = {
//     debounce,
// }
