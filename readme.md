# Expression.js

Advanced and extensible mathematical expression evaluator in javascript

```javascript
// Simple equation (the following occurs with no evals)
Expression('3*x + sin(y)').evaluate({ x: 10, y: 0 }); // = 30

// All "compilation" occurs in Expression creation, with evaluate calls happening quickly
var equation = Expression('3*x + sin(y)'); // Initial compilation
equation.evaluate({ x: 10, y: 0 });        // Fast evaluation
equation.evaluate({ x: 20, y: 1 });        // Fast evaluation
equation.evaluate({ x: 30, y: -1 });       // Fast evaluation
```

# Use built-in functions
```javascript
Expression('min(x, abs(y), sqrt(z), ceil(5.25))').evaluate({ x: 4, y: -100, z: 25 }); // = 4

// Available functions
// general: sqrt, log, abs, 
// trig: sin, cos, tan, asin, acos, atan, atan2
// rounding: round, ceil, floor
```

# Extend with custom functions
```javascript
Expression.functions['sum'] = function () {
    var result = 0;
    for (var i = 0, max = arguments.length; i < max; i += 1) {
        result += arguments[i];
    }
    return result;
}
Expression('sum(1, 2, 3, 4)').evaluate(); // = 10
```

# Override and extend all built-in functionality
```javascript
// Floating point operations can have surprising results by default
Expression('0.3 - 0.1').evaluate(); // = 0.19999999999999998

// Use [big.js](https://github.com/MikeMcl/big.js) for precise decimal arithmetic
Expression.operators['-'] = function (a, b) {
    a = Big(a);
    b = Big(b);
    return parseFloat(a.minus(b));
}

// Try the same operation again with new big.js method
Expression('0.3 - 0.1').evaluate(); // = 0.2
```
