/**
 * Evaluate RPN operation stack
 * 
 * @param {Array} RPN operation stack
 * @return {Varies}
 * @static
 */
Expression.evaluateRPN = (function () {
    function evaluateRPN(RPN) {
        Expression.utils.each(RPN, function (value, index) {
            if (Expression.utils.isOperator(value)) {
                
            } else if (value === ')') {
                
            } else {
                
            }
        });

        // [3, 4, 5, 6, +, (, 7, 8, *, ), sin, +, *, +, 12, +]
        // [3, 4, 11, (, 7, 8, *, ), sin, +, *, +, 12, +]
        // [3, 4, 11, (, 56, ), sin, +, *, +, 12, +]
        // [3, 4, 11, sin(56), +, *, +, 12, +]
        // [3, 4, 11 + sin(56), *, +, 12, +]
        // [3, 4, 11 + sin(56), *, +, 12, +]
        // [3, 4*(11 + sin(56)), +, 12, +]
        // [3+4*(11 + sin(56)), 12, +]
        // = 3+4*(11 + sin(56))+12

        return 0; 
    }

    return evaluateRPN;
}());
