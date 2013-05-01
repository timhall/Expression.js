/**
 * Evaluate RPN operation stack
 * 
 * @param {Array} RPN operation stack
 * @return {Varies}
 * @static
 */
Expression.evaluateRPN = (function () {
    function evaluateRPN(RPN) {
        var result = 0,
            operation;

        if (RPN.length === 1) {
            result = RPN[0];
        } else {
            Expression.utils.each(RPN, function (value, index) {
                if (Expression.utils.isOperator(value)) {
                    // Evaluate operation and replace in RPN stack
                    operation = Expression.operators[value].fn(RPN[index - 2], RPN[index - 1]);
                    RPN.splice(index - 2, 3, operation);
                    result = evaluateRPN(RPN);

                    return false;
                } else if (value === ')') {
                    // Evaluate function

                    return false;
                } else {
                    // Continue
                }
            });
        }   

        

        // [3, 4, 5, 6, +, (, 7, 8, *, ), sin, +, *, +, 12, +]
        // [3, 4, 11, (, 7, 8, *, ), sin, +, *, +, 12, +]
        // [3, 4, 11, (, 56, ), sin, +, *, +, 12, +]
        // [3, 4, 11, sin(56), +, *, +, 12, +]
        // [3, 4, 11 + sin(56), *, +, 12, +]
        // [3, 4, 11 + sin(56), *, +, 12, +]
        // [3, 4*(11 + sin(56)), +, 12, +]
        // [3+4*(11 + sin(56)), 12, +]
        // = 3+4*(11 + sin(56))+12 

        return result;
    }

    return evaluateRPN;
}());
