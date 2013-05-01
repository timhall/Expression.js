// Default functions
Expression.functions = Expression.utils.extend({
    // Built-in Math functions
    'sqrt': Math.sqrt,
    'log': Math.log,
    'abs': Math.abs,
    'sin': Math.sin,
    'cos': Math.cos,
    'tan': Math.tan,
    'asin': Math.asin,
    'acos': Math.acos,
    'atan': Math.atan,
    'atan2': Math.atan2,
    'round': Math.round,
    'ceil': Math.ceil,
    'floor': Math.floor
}, {
    // Custom functions
    '-': function negate(value) {
        return -(value);
    },
    'max': function max() {
        var values = Array.prototype.slice.call(arguments), 
            result;

        Expression.utils.each(values, function (value) {
            if (result === undefined || value > result) { result = value; } 
        });

        return result;
    }
});
