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
