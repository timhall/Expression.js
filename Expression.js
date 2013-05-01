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
    this.options = {};

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
Expression.utils = {
    toString: function (value) {
        return {}.toString.call(value);   
    },
    isString: function (value) {
        return typeof value === 'string' || Expression.utils.toString(value) === '[object String]';
    }  
};

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
 * @param {Array} rpn operation stack
 * @return {Varies}
 * @static
 */
Expression.evaluateRPN = function (RPN) {
    return 5; 
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
