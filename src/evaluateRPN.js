/**
 * Evaluate RPN operation stack
 * 
 * @param {Array} RPN operation stack
 * @return {Varies}
 * @static
 */
Expression.evaluateRPN = function evaluateRPN(RPN) {
    var result = 0,
        operation, leftIndex, fn;

    if (RPN.length === 1) {
        result = RPN[0];
    } else {
        Expression.utils.each(RPN, function (value, index) {
            if (Expression.utils.isOperator(value)) {
                // Evaluate operation and replace in RPN stack
                fn = Expression.operators[value].fn;

                if (fn && index - 2 >= 0) {
                    // Evaluate
                    operation = fn(RPN[index - 2], RPN[index - 1]);

                    // Splice in result and evaluate updated RPN stack
                    RPN.splice(index - 2, 3, operation);
                    result = evaluateRPN(RPN);    
                } else {
                    // Throw
                }                    

                return false;
            } else if (value === ')') {
                // Evaluate function
                leftIndex = Expression.utils.indexOfFromRight(RPN, '(', index);
                if (leftIndex >= 0 && index > leftIndex && index + 1 < RPN.length) {
                    fn = Expression.functions[RPN[index + 1]];

                    if (fn) {
                        // Evaluate
                        operation = fn.apply(undefined, RPN.slice(leftIndex + 1, index));
                            
                        // Splice in result and evaluate updated RPN stack
                        RPN.splice(leftIndex, index + 1 - leftIndex + 1, operation);
                        result = evaluateRPN(RPN);
                    } else {
                        // Throw
                    }
                } else {
                    // Throw
                }

                return false;
            } else {
                // Continue
            }
        });
    }

    return result;
};

Expression.evaluateRPN2 = function (RPN) {
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
