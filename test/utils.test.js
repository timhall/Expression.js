var expect = require('chai').expect,
    utils = require('../Expression.js').utils,
    fixtures = {};

describe('utils', function () {
    describe('isString', function () {
        it('should identify only strings', function () {
            expect(utils.isString('abc')).to.equal(true);
            expect(utils.isString("abc")).to.equal(true);
            expect(utils.isString(new String('abc'))).to.equal(true);

            expect(utils.isString({ value: 'abc' })).to.equal(false);
            expect(utils.isString(123)).to.equal(false);
            expect(utils.isString(['abc'])).to.equal(false);
            expect(utils.isString(/-?[0-9]+(\.[0-9]+)?/)).to.equal(false);
        });
    });

    describe('isNumber', function () {
        describe('Strings', function () {
            it('should identify negative numbers', function () {
                expect(utils.isNumber('-123')).to.equal(true);
            });    

            it('should identify decimals', function () {
                expect(utils.isNumber('123.456')).to.equal(true);
            });

            it('should identify negative decimals', function () {
                expect(utils.isNumber('-123.456')).to.equal(true);
            });
        });
    });

    describe('has', function () {
        it('should identify owned properties', function () {
            var test = {
                a: 'b',
                b: function () {},
                c: { a: 'b' },
                d: []
            }

            expect(utils.has(test, 'a')).to.equal(true);
            expect(utils.has(test, 'b')).to.equal(true);
            expect(utils.has(test, 'c')).to.equal(true);
            expect(utils.has(test, 'd')).to.equal(true);
        });

        it('should not identify prototype properties', function () {
            var Test = function () {} 
            Test.prototype.a = 'b';
            Test.prototype.b = function () {};
            Test.prototype.c = { a: 'b' }
            Test.prototype.d = [];

            var test = new Test();

            expect(utils.has(test, 'a')).to.equal(false);
            expect(utils.has(test, 'b')).to.equal(false);
            expect(utils.has(test, 'c')).to.equal(false);
            expect(utils.has(test, 'd')).to.equal(false);
        });
    });
});
