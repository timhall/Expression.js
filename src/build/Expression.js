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
// @include ../utils.js
    
return Expression;

}));
