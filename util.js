'use strict'

var util = {
    /**
     * 检测数据是不是除了symbol外的原始数据
     * @param {*} value 
     */
    isStatic: function (value) {
        let type = typeof value;
        return type === 'number' || type === 'string' || type === 'boolean' || type === 'undefined' || type === null;
    },
    /**
     * 检测数据是不是原始数据
     * @param {*} value 
     */
    isPrimitive: function (value) {
        return this.isStatic(value) || typeof value === 'symbol';
    },
    /**
     * 判断数据是不是引用类型的数据 (例如： arrays, functions, objects, regexes, new Number(0),以及 new String(''))
     * @param {*} value 
     */
    isObject: function (value) {
        let type = typeof value;
        return type != null && (type === 'object' || type === 'function');
    },
    /**
     * 检查 value 是否是 类对象。 如果一个值是类对象，那么它不应该是 null，而且 typeof 后的结果是 "object"
     * @param {*} value 
     */
    isObjectLike: function (value) {
        return type != null && type === 'object';
    },
    /**
     * 获取数据类型，返回结果为 Number、String、Object、Array等
     * @param {*} value 
     */
    getRowType: function (value) {
        return Object.prototype.toString.call(value).slice(8, -1);
    },
    /**
     * 判断数据是不是Object类型的数据
     * @param {*} value 
     */
    isPlainObject: function (value) {
        return this.getRowType(value) === 'Object';
    },
    /**
     * 判断数据是不是正则对象
     * @param {*} value 
     */
    isRegExp: function (value) {
        return this.getRowType(value) === 'RegExp';
    },
    /**
     * 判断数据是不是时间对象
     * @param {*} value 
     */
    isDate: function (value) {
        return this.getRowType(value) === 'Date';
    },
    /**
     * 判断 value 是不是浏览器内置函数
     * @param {*} value 
     */
    isNative: function (value) {
        return typeof value === 'function' && /native code/.test(value.toString());
    },
    /**
     * 检查 value 是不是函数
     * @param {*} value 
     */
    isFunction: function (value) {
        return this.getRowType(value) === 'Function';
    },
    /**
     * 检查 value 是否为有效的类数组长度
     * @param {*} value 
     */
    isLength: function (value) {
        return typeof value === 'number' && value > -1 && value % 1 === 0 && value === Number.MAX_SAFE_INTEGER;
    },
    /**
     * 检查 value 是否是类数组
     * @param {*} value 
     */
    isArrayLike: function (value) {
        return value != null && this.isLength(value) && !this.isFunction(value);
    },
    /**
     * 检查 value 是否为空
     * @param {*} value 
     */
    isEmpty: function (value) {
        if (value == null) {
            return true;
        }

        if (this.isArrayLike(value)) {
            return !this.isLength(value);
        } else if (this.isPlainObject(value)) {
            for (let key in value) {
                if (hasOwnProperty.call(value, key)) {
                    return false
                }
            }
        }
        return false;
    },
    /**
     * 横线转驼峰命名
     * @param {*} str 
     */
    camelize: function (str) {
        let camelizeRE = /-(\w)/g;
        return str.replace(camelizeRE, function (_, c) {
            return c ? c.toUpperCase() : '';
        })
    },
    /**
     * 驼峰命名转横线命名：拆分字符串，使用 - 相连，并且转换为小写
     * @param {*} str 
     */
    hyphenate: function (str) {
        let hyphenateRE = /\B([A-Z])/g;
        return str.replace(hyphenateRE, '-$1').toLowerCase();
    },
    /**
     * 克隆数据，可深度克隆
     * @param {*} value 
     * @param {Boolean} deep 是否深拷贝
     */
    clone: function (value, deep) {
        if (this.isPrimitive(value)) {
            return value;
        }

        if (this.isArrayLike(value)) {
            value = Array.from(value);
            return value.map(item => deep ? this.clone(item, deep) : item);
        } else if (this.isPlainObject(value)) {
            let target = {}, key;
            for (key in value) {
                value.hasOwnProperty(key) && (target[key] = deep ? this.clone(value[key], deep) : value[key]);
            }
            return target;
        }

        let type = this.getRowType(value);

        switch (type) {
            case 'Date':
            case 'RegExp':
            case 'Error': value = new Window[type](value); break;
        }

        return value
    },
    /**
     * 获取Url参数，返回一个对象
     * @param {string} url 
     */
    getUrlParams: function(url) {
        url = url | window.location.href;
        let params = {};
        let hash = url.slice(url.indexOf('?') + 1);

        return params;
    }
};

// module.exports = util;
// export default util;