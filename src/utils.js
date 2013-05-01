// Utilities
// Thanks [Lo-Dash](http://lodash.com/)!
Expression.utils = (function () {
    
    // Determine if given value is a string
    var isString = function (value) {
        return typeof value === 'string' || Expression.utils.toString(value) === '[object String]';
    };

    // Determine if given value is a function (with fallback)
    var isFunction = function (value) {
        return typeof value === 'function';
    };
    if (isFunction(/x/)) {
        isFunction = function (value) {
            return typeof value === 'function' && toString(value) === '[object Function]';
        };
    }

    // Determine if given value is an array
    var isArray = Array.isArray || function (value) {
        return value ? (typeof value === 'object' && toString(value) === '[object Array]') : false;
    };

    // Check if object has own property
    var has = function (obj, property) {
        return Object.prototype.hasOwnProperty.call(obj, property);
    };

    // Determine class name of given value
    var toString = function (value) {
        return {}.toString.call(value);   
    };

    // Iterate through array/object with iterator
    var nativeForEach = Array.prototype.forEach;
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

    // Extend object with other objects
    var extend = function (obj) {
        each(Array.prototype.slice.call(arguments, 1), function (source) {
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
        has: has,

        toString: toString,
        each: each,
        forEach: each
    };
}());
