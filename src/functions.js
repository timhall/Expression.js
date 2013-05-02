// Default functions
Expression.functions = {
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
    'floor': Math.floor,
    'max': Math.max,
    'min': Math.min,

    // Custom functions
    '-': function negate(value) {
        return -(value);
    }
};
