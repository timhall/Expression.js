// Expression.js - Advanced expression evaluation in javascript
// (c) Tim Hall - https://github.com/timhall/Expression.js - License: MIT

(function (root, factory) {
    if (typeof exports === 'object') {
        // Node
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else {
        // Browser global
        root.Expression = factory();
    }
}(this, function () {

"use strict";

/**
 * @class Expression
 * 
 * @param {String} expression
 * @param {Object} options
 */
function Expression(expression, options) {
    // Allow invoking without `new`
    if (!(this instanceof Expression)) {
        return new Expression(expression, options);
    }

    this.expression = expression;
    this.options = Expression.utils.extend({}, Expression.defaults, options);

    // Convert expression to RPN and prepare for evaluation
    this._tokens = Expression.convertToTokens(this.expression);
    this._rpn = expression.convertToRPN(this._tokens);
}

Expression.defaults = {};
Expression.functions = {};

/**
 * Evaluate expression using given variables
 *
 * @param {Object} variables
 * @return {Varies}
 */
Expression.prototype.evaluate = function (variables) {

};

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
     * Find the index of the first occurence of value in the given array (using ===)
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
     * Find the index of the first occurence of the value from the right of the given array
     *
     * @param {Array} array
     * @param {Mixed} value
     * @param {start} [Number]
     * @return {Number} index or -1
     */
    var indexOfFromRight = function (array, value, start) {
        var index = start !== undefined ? start : array.length - 1;

        while (index-- > 0) {
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
        indexOfFromRight: indexOfFromRight,
        extend: extend
    };
}());

/**
 * Separate expression into array tokens
 * 
 * @param {String} expression
 * @return {Array} of String
 * @static
 */
Expression.toTokens = function (expression) {
    var tokens = [];

    tokens = expression.split(' ');

    return tokens;
};

/**
 * Convert given expression tokens to RPN stack
 *
 * @param {Array} tokens
 * @return {Array} RPN operations stack
 */
Expression.toRPN = function (tokens) {
        
};

/**
 * Evaluate RPN operation stack
 * 
 * @param {Array} RPN operation stack
 * @return {Varies}
 * @static
 */
Expression.evaluateRPN = function (RPN) {
    var index = 0,
        leftParens = [],
        item, leftParen, fn, subvalue;

    while (index < RPN.length) {
        item = RPN[index];

        if (Expression.operators[item] !== undefined) {
            // Roll back to first operand
            index = index - 2;

            // Calculate operation subvalue
            subvalue = Expression.operators[item].fn(RPN[index], RPN[index + 1]);

            // Splice in subvalue for operation
            RPN.splice(index, 3, subvalue);
        } else if (item === ')') {
            leftParen = leftParens.pop();

            if (leftParen !== undefined) {
                fn = Expression.functions[RPN[index + 1]];

                if (fn) {
                    // Evaluate
                    subvalue = fn.apply(undefined, RPN.slice(leftParen + 1, index));
                            
                    // Splice in result and evaluate updated RPN stack
                    RPN.splice(leftParen, index + 1 - leftParen + 1, subvalue);
                    index = leftParen;
                } else {
                    // Throw
                }
            }
        } else if (item === '(') {
            leftParens.push(index);
        }

        index++;
    }

    return RPN[0];
};

/**
 * @class Operator
 *
 * @param {Function} fn
 * @param {Number} precedence
 * @param {String} associative (right|left)
 */
Expression.operator = function (precedence, associative, fn) {
    return {
        fn: fn,
        precedence: precedence,
        associative: associative
    };
};

// Default operators
Expression.operators = {
    '+': Expression.operator(3, 'left', function add(a, b) { return a + b; }),
    '-': Expression.operator(3, 'left', function subtract(a, b) { return a - b; }),
    '*': Expression.operator(5, 'left', function multiply(a, b) { return a * b; }),
    '/': Expression.operator(5, 'left', function divide(a, b) { return a / b; }),
    '^': Expression.operator(6, 'left', function power(a, b) { return Math.pow(a, b); })
};

// Default functions
Expression.functions = {
    // Built-in Math functions
    'sqrt': Math.sqrt,
    'log': Math.log,
    'abs': Math.abs,
    'sin': Math.sin,
    'cos': Math.cos,
    'tan': Math.tan,
    'asin': Math.asin,
    'acos': Math.acos,
    'atan': Math.atan,
    'atan2': Math.atan2,
    'round': Math.round,
    'ceil': Math.ceil,
    'floor': Math.floor,
    'max': Math.max,
    'min': Math.min,

    // Custom functions
    '-': function negate(value) {
        return -(value);
    }
};

    
return Expression;

}));
