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
  // this.options = Expression.utils.extend({}, Expression.defaults, options);

  // "Compile" function
  this.compiled = new Function('state', 'op', 'fn', this.build() + '; return state;');

  return this;
}

Expression.defaults = {};

Expression.prototype.build = function () {
  // this.expression: c = a + b
  return "state['c'] = op['+'](state['a'], state['b'])";
};

Expression.prototype.evaluate = function (state) {
  return this.compiled(state, Expression.operations, Expression.functions);;
}

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
