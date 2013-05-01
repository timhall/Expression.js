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
    var result = 0;

    Expression.utils.each(RPN, function (item, index) {
        if (Expression.utils.isString(item)) {
            
        } else {
            
        }
    });

    return result; 
};

// Default operators
Expression.operators = {
    precedence: {
        '+': 3,
        '-': 3,
        '*': 5,
        '/': 5
    },
    associative: {
        '+': 'left',
        '-': 'left',
        '*': 'left',
        '/': 'left'
    },

    '+': function add(a, b) {
        return a + b;
    },
    '-': function subtract(a, b) {
        return a - b;
    },
    '*': function multiply(a, b) {
        return a * b;
    },
    '/': function divide(a, b) {
        return a / b;
    }
};

    
return Expression;

}));
