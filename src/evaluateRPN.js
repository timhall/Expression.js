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
