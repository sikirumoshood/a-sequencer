/* eslint-env mocha */
const { isFunction, isExpectedObject } = require('../../../src/helpers/helpers');
const assert = require('assert');

describe('UNIT TEST FOR HELPERS MODULE', () => {
    it('Should PASS isFunction method, arg is a FUNCTION', () => {
        const func = () => {};
        const isAFunction = isFunction(func);
        assert(isAFunction === true);
    });

    it('Should FAIL isFunction method, arg is NOT A FUNCTION', () => {
        const arg = {};
        const isAFunction = isFunction(arg);
        assert(isAFunction === false);
    });

    it('Should FAIL isExpectedObject method, name and args properties missing', () => {
        const arg = {};
        const isCorrectFormat = isExpectedObject(arg);
        assert(isCorrectFormat === false);
    });

    it('Should FAIL isExpectedObject method, name property is not a function', () => {
        const arg = { name: 'Not a function' };
        const isCorrectFormat = isExpectedObject(arg);
        assert(isCorrectFormat === false);
    });

    it('Should FAIL isExpectedObject method, args property is not an array', () => {
        const arg = {
            name: () => {
                console.log('Correct');
            },
            args: {}
        };
        const isCorrectFormat = isExpectedObject(arg);
        assert(isCorrectFormat === false);
    });

    it('Should PASS isExpectedObject method, FORMAT CORRECT', () => {
        const arg = {
            name: () => {
                console.log('Correct');
            },
            args: []
        };
        const isCorrectFormat = isExpectedObject(arg);
        assert(isCorrectFormat === true);
    });
});
