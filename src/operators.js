// Default operators
Expression.operators = {
    precedence: {
        '+': 3,
        '-': 3,
        '*': 5,
        '/': 5,
        '^': 6
    },
    associative: {
        '+': 'left',
        '-': 'left',
        '*': 'left',
        '/': 'left',
        '^': 'right'
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
    },
    '^': function power(a, b) {
        return a ^ b;
    }
};
