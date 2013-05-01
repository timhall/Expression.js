// Default operators
Expression.operators = {
    precedence: {
        '+': 3,
        '-': 3,
        '*': 5,
        '/': 5
    },
    associative: {
        '+': 'left',
        '-': 'left',
        '*': 'left',
        '/': 'left'
    },

    '+': function add(a, b) {
        return a + b;
    },
    '-': function subtract(a, b) {
        return a - b;
    },
    '*': function multiply(a, b) {
        return a * b;
    },
    '/': function divide(a, b) {
        return a / b;
    }
};
