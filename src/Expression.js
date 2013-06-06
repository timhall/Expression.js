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
  this.state = new State();
  // this.options = Expression.utils.extend({}, Expression.defaults, options);

  // "Compile" function
  this.compiled = new Function('state', 'op', 'fn', this.build() + '; return state;');

  return this;
}

var State = Expression._State = function (initial) {
  var _values = {};
  var _state = function (parameter) {
    // e.g. state()('...') => get/set multiple parameters
    if (parameter === undefined) {
      return function (values) {
        if (values !== undefined) {
          _state.setValues(values);
        } else {
          return _values;
        }
      }
    // e.g. state('b')('...') => get/set single parameter
    } else {
      return function (value) {
        if (value !== undefined) {
          return _values[parameter] = value;
        } else {
          return _values[parameter];
        }
      }
    }
  }
  _state.setValues = function (values) {
    for (var parameter in values) {
      _values[parameter] = values[parameter];
    }
    return _state;  
  }

  return _state.setValues(initial);
}

var Operation = Expression._Operation = function (callback) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    for (var i = 0, max = args.length; i < max; i += 1) {
      if (typeof args[i] === 'function') {
        args[i] = args[i]();
      }
    }

    return callback.apply(this, args);
  }
};

Expression.defaults = {};

Expression.prototype.build = function () {
  // this.expression: c = a + b
  return "fn['eq'](state('c'), op['+'](state('a'), state('b')))";
};

Expression.prototype.evaluate = function (state) {
  this.state.setValues(state);
  return this.compiled(this.state, Expression.operations, Expression.functions);
}

Expression.operations = {
  '+': new Operation(function (a, b) { return a + b; }),
  '-': new Operation(function (a, b) { return a - b; }),
  '*': new Operation(function (a, b) { return a * b; }),
  '/': new Operation(function (a, b) { return a / b; }),
  '^': new Operation(function (a, b) { return Math.pow(a, b); })
};
Expression.functions = {
  'neg': function (a) {
    if (typeof a === 'function') { a = a(); }
    return -a;
  },
  'eq': function (a, b) {
    if (typeof b === 'function') { b = b(); }
    if (typeof a === 'function') {
      return a(b);
    } else {
      return a = b;
    }
  }
};
