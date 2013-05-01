var expect = require('chai').expect,
    evaluateRPN = require('../Expression.js').evaluateRPN,
    fixtures = {};

describe('evaluateRPN', function () {
    it('should evaluate simple arithmetic', function () {
        // (((3 + 4) - (5 - 6)) * 7) / 8
        expect(evaluateRPN([3, 4, '+', 5, 6, '-', '-', 7, '*', 8, '/'])).to.equal(7);    
    });

    it('should evaluate with simple functions', function () {
        expect(evaluateRPN(['(', 2, 2, '+', ')', 'sqrt'])).to.equal(2);
    });

    it('should evaluate nested functions', function () {
        expect(evaluateRPN(['(', 3, '(', 2, 3, '-', ')', 'abs', '+', ')', 'sqrt'])).to.equal(2);
    });

    it('should evaluate functions with many arguments', function () {
        expect(evaluateRPN([3, 4, '(', 5, 6, '+', '(', 7, 8, '*', ')', 'sin', 3, '+', 4, 7, '^', ')', 'max', '*', '+', 12, '+'])).to.equal(65551); 
    });

    it('should evaluate with negation operator', function () {
        expect(evaluateRPN(['(', '(', 2, 2, '+', ')', 'sqrt', ')', '-'])).to.equal(-2);
    });
});
