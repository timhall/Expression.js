/**
 * @class Operator
 *
 * @param {Function} fn
 * @param {Number} precedence
 * @param {String} associative (right|left)
 */
Expression.operator = function (fn, precedence, associative) {
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
    '^': Expression.operator(6, 'left', function power(a, b) { return a ^ b; })
};
