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

// Use built-in functions
// ----------------------
Expression('min(x, abs(y), max(z, 25))').evaluate({ x: 4, y: -100, z: 10 }); // = 4

// Extend with custom functions
// ----------------------------
Expression.functions['sum'] = function () {
    var result = 0;
    for (var i = 0, max = arguments.length; i < max; i += 1) {
        return += arguments[i];
    }
    return result;
}
Expression('sum(1, 2, 3, 4)').evaluate(); // = 10

// Override operations
// -------------------
Expression('0.3 - 0.1').evaluate(); // = 0.19999999999999998

// (use [big.js](https://github.com/MikeMcl/big.js) for precise decimal arithmetic
Expression.operations['-'] = function (a, b) {
    return parseFloat(Big(a).minus(Big(b)));
}

Expression('0.3 - 0.1').evaluate(); // = 0.2
```
