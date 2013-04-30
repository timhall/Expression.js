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
Expression.operators = {};
Expression.functions = {};

/**
    * Evaluate expression using given variables
    *
    * @param {Object} variables
    * @return {Varies}
    */
Expression.prototype.evaluate = function (variables) {


    return Expression.evaluateRPN(this._rpn);
};

/**
 * Separate expression into array tokens
 * 
 * @param {String} expression
 * @return {Array} of String
 * @static
 */
Expression.convertToTokens = function (expression) {
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
Expression.convertToRPN = function (tokens) {
        
};

/**
 * Evaluate RPN operation stack
 * 
 * @param {Array} rpn operation stack
 * @return {Varies}
 * @static
 */
Expression.evaluateRPN = function (RPN) {
        
};

    
return Expression;

}));
