(function (root, factory) {
    if (typeof exports === 'object') {
        // Node
        module.exports = factory(require('underscore'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(['underscore'], factory);
    } else {
        // Browser global
        root.Expression = factory(root._);
    }
}(this, function (_) {

"use strict";

// @include ../Expression.js
// @include ../utils.js
    
return Expression;

}));
