(function (root, factory) {
    if (typeof exports === 'object') {
        // Node
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else {
        // Browser global
        root.Expression = factory();
    }
}(this, function () {

"use strict";

// @include ../Expression.js
// @include ../toTokens.js
// @include ../toRPN.js
// @include ../evaluateRPN.js
// @include ../operators.js
    
return Expression;

}));
