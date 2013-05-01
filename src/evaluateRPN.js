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
