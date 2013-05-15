/**
 * @class Expression
 * 
 * @param {String} expression
 * @param {Object} options
 */
function Expression(expression, options) {
    // Allow invoking without `new`
    if (!(this instanceof Expression)) {
        return new Expression(expression, options);
    }

    this.expression = expression;
    //this.options = Expression.utils.extend({}, Expression.defaults, options);

    // "Compile" function
 	this.compiled = new Function('state', 'fn', 'bi', 'un', this.build() + '; return state;');

 	return this;
}

Expression.prototype.build = function () {
	// this.expression: c = a + b
	return "state['c'] = bi['+'](state['a'], state['b'])";
};

Expression.prototype.evaluate = function (state) {
	return this.compiled(state, Expression.fn, Expression.bi, Expression.un);
}

Expression.operators = {
	binary: {
		'+': { precedence: 3, associative: 'left' },
		'-': { precedence: 3, associative: 'left' },
		'*': { precedence: 5, associative: 'left' },
		'/': { precedence: 5, associative: 'left' },
		'^': { precedence: 6, associative: 'right' }
	},
	unary: {
		'-': { precedence: 4 }
	}
};

Expression.bi = {
	'+': function (a, b) { return a + b; },
	'-': function (a, b) { return a - b; },
	'*': function (a, b) { return a * b; },
	'/': function (a, b) { return a / b; },
	'^': function (a, b) { return Math.pow(a, b); }
};
Expression.un = {
	'-': function (a) { return -a; }
};
Expression.fn = {};
