// Utilities
// Thanks [Lo-Dash](http://lodash.com/)!
Expression.utils = (function () {
    var objectRef = {},
        hasOwnProperty = objectRef.hasOwnProperty,
        nativeKeys = Object.keys,
        nativeForEach = Array.prototype.forEach,
        slice = Array.prototype.slice,
        isNumberRegExp = /-?[0-9]+(\.[0-9]+)?/;

    /**
     * Determine if given value is a string
     * 
     * @param {Varies} value
     * @return {Boolean} isString
     */
    var isString = function (value) {
        return typeof value === 'string' || Expression.utils.toString(value) === '[object String]';
    };

    /**
     * Determine if given value is a function (with fallback)
     * 
     * @param {Varies} value
     * @return {Boolean} isFunction
     */
    var isFunction = function (value) {
        return typeof value === 'function';
    };
    if (isFunction(/x/)) {
        isFunction = function (value) {
            return typeof value === 'function' && toString(value) === '[object Function]';
        };
    }

    /**
     * Determine if given value is an array
     * 
     * @param {Varies} value
     * @return {Boolean} isArray
     */
    var isArray = Array.isArray || function (value) {
        return value ? (typeof value === 'object' && toString(value) === '[object Array]') : false;
    };

    /**
     * Determine if given string is a number 
     * 
     * @param {Varies} value
     * @return {Boolean} isNumber
     */
    var isNumber = function (value) {
        if (isString(value)) {
            return isNumberRegExp.test(value);    
        } else {
            return typeof value === 'number' || toString(value) === '[object Number]';
        }
    };

    /**
     * Determine if given value is an operator
     *
     * @param {Mixed} value
     * @return {Boolean} isOperator
     */
    var isOperator = function (value) {
        return indexOf(keys(Expression.operators), value) > -1;
    };

    /**
     * Check if object has own property
     * 
     * @param {Object} obj
     * @param {String} property
     * @return {Boolean} hasOwnProperty
     */
    var has = function (obj, property) {
        return hasOwnProperty.call(obj, property);
    };

    /**
     * Determine class name of given value
     * 
     * @param {Varies} value
     * @return {String} Class name of value, e.g. "[object Array]"
     */
    var toString = function (value) {
        return objectRef.toString.call(value);   
    };

    /**
     * Get all owned keys for given object
     *
     * @param {Object} obj
     * @return {Array} of String keys
     */
    var keys = nativeKeys || function (obj) {
        if (obj !== Object(obj)) { throw new TypeError('Invalid object'); }
        var keys = [];
        for (var key in obj) {
            if (has(obj, key)) { keys[keys.length] = key; }
        }
        return keys;
    };

    /**
     * Iterate through array/object with iterator
     * 
     * @param {Object|Array} obj
     * @param {Function} iterator(item, index|key, obj)
     * @param {Varies} [context] to call iterator with
     * @chainable (obj)
     */
    var each = function (obj, iterator, context) {
        if (!obj || !iterator) { return; }

        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (isArray(obj)) {
            var index = -1,
                length = obj.length;
            
            while (index++ < length) {
                if (iterator.call(context, obj[index], index, obj) === false) {
                    break;
                }  
            }
        } else {
            for (var key in obj) {
                if (has(obj, key)) {
                    if (iterator.call(context, obj[key], key, obj) === false) {
                        return;
                    }
                }
            }
        }

        return obj;
    };

    /**
     * Find the index of the first occurance of value in the given array (using ===)
     *
     * @param {Array} array
     * @param {Mixed} value
     * @return {Number} index or -1
     */
    var indexOf = function (array, value) {
        var index = -1,
            length = array ? array.length : 0;

        while (++index < length) {
            if (array[index] === value) {
                return index;
            }
        }
        return -1;
    };

    /**
     * Extend object with parameters from given source objects
     * 
     * @param {Object} obj
     * @param {Object...} Source objects
     * @return {Object} Extended object
     */
    // Extend object with other objects
    var extend = function (obj) {
        each(slice.call(arguments, 1), function (source) {
            if (source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            }
        });

        return obj;
    };

    return {
        isString: isString,
        isFunction: isFunction,
        isArray: isArray,
        isNumber: isNumber,
        isOperator: isOperator,
        has: has,

        toString: toString,
        keys: keys,
        each: each,
        forEach: each,
        indexOf: indexOf,
        extend: extend
    };
}());
