var expect = require('chai').expect,
    toTokens = require('../Expression.js').toTokens,
    fixtures = {};

describe('toTokens', function () {
    it('should split simple expression with spaces', function () {
        expect(toTokens('3.14 + 4100 ^ 0.123'))
            .to.deep.equal(['3.14', '+', '4100', '^', '0.123']);
    });

    it.skip('should split simple expression without spaces', function () {
        expect(toTokens('3.14+4100^0.123'))
            .to.deep.equal(['3', '+', '4', '^', '0.123']);
    });

    it.skip('should split by parentheses and operators', function () {
        expect(toTokens('(1+2-(3*4/(5^6))) - -7%8')) 
            .to.deep.equal(['(','1','+','-','(','3','*','4','/','(','5','^','6',')',')',')','-','-','7','%','8']);
    });
});
