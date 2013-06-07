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
  this.options = Expression.utils.extend({}, Expression.defaults, options);

  // "Compile" function
  this.compiled = new Function('state', 'op', 'fn', this._build() + '; return state;');

  return this;
}

/**
 * @static
 */
Expression.defaults = {};

Expression.operations = {
  '+': function (a, b) { return a + b; },
  '-': function (a, b) { return a - b; },
  '*': function (a, b) { return a * b; },
  '/': function (a, b) { return a / b; },
  '^': function (a, b) { return Math.pow(a, b); }
};

Expression.functions = {
  'neg': function (a) {
    return -a;
  }
};

/**
 * Build expression into compiled js function representation
 *
 * @returns {String} compiled expression
 * @prototype
 */
Expression.prototype._build = function () {
  // this.expression: c = a + b
  return "state['c'] = op['+'](state['a'], state['b'])";
};

/**
 * Evaluate compiled expression using the given state
 *
 * @param {Object} state
 * @returns {Object} updated state
 * @prototype
 */
Expression.prototype.evaluate = function (state) {
  return this.compiled(state, Expression.operations, Expression.functions);
};
