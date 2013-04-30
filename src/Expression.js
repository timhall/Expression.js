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
