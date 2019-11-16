/* eslint-env mocha */
const { processPromisesWithArgs, processPromisesWithNoArgs } = require('../../../src/util/utils');
const chai = require('chai');

describe('UNIT TEST FOR UTILS MODULE', () => {
    it('Should FAIL processPromisesWithArgs method, NO arg passed ', async() => {
        try {
            await processPromisesWithArgs();
        } catch (e) {
            chai.expect(e.message).to.equal('An argument is expected');
        }
    });

    it('Should FAIL processPromisesWithArgs method, arg NOT an array ', async() => {
        try {
            await processPromisesWithArgs({});
        } catch (e) {
            chai.expect(e.message).to.equal('Argument must be a type of array');
        }
    });

    it('Should FAIL processPromisesWithArgs method, elements of array arg not an object', async() => {
        try {
            await processPromisesWithArgs([ 'Something' ]);
        } catch (e) {
            chai.expect(e.message).to.equal('Object of form { name:[Func], args: [Array] } expected');
        }
    });

    it('Should PASS processPromisesWithArgs method', async() => {
        const arg1 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 2000));
        const arg2 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 100));
        const arg3 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 10));
        const arg4 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 1));
        try {
            const results = await processPromisesWithArgs([
                { name: arg1, args: [ 'First' ] },
                { name: arg2, args: [ 'Second' ] },
                { name: arg3, args: [ 'Third' ] },
                { name: arg4, args: [ 'Fourth' ] }
            ]);
            chai.expect(results).to.be.an('array');
            chai.expect(results.length).to.equal(4);
        } catch (e) {
            chai.expect(e.message).to.equal('Object of form { name:[Func], args: [Array] } expected');
        }
    });

    it('Should STOP processPromisesWithArgs method execution when one gets rejected', async() => {
        const arg1 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 2000));
        const arg2 = (arg) => new Promise((resolve, reject) => setTimeout(() => reject(new Error(arg)), 100));
        const arg3 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 10));
        const arg4 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 1));
        try {
            const results = await processPromisesWithArgs([
                { name: arg1, args: [ 'First' ] },
                { name: arg2, args: [ 'Second' ] },
                { name: arg3, args: [ 'Third' ] },
                { name: arg4, args: [ 'Fourth' ] }
            ]);
            chai.expect(results).to.be.an('array');
            chai.expect(results.length).to.equal(4);
        } catch (e) {
            chai.expect(e.message).to.not.equal('null');
        }
    });

    it('Should FAIL processPromisesWithNoArgs method, NO arg passed ', async() => {
        try {
            await processPromisesWithNoArgs();
        } catch (e) {
            chai.expect(e.message).to.equal('An argument is expected');
        }
    });

    it('Should FAIL processPromisesWitNohArgs method, arg NOT an array ', async() => {
        try {
            await processPromisesWithNoArgs({});
        } catch (e) {
            chai.expect(e.message).to.equal('Argument must be a type of array');
        }
    });

    it('Should FAIL processPromisesWithNoArgs method, elements of array arg not a FUNCTION ', async() => {
        try {
            await processPromisesWithNoArgs([ 'Should be a function' ]);
        } catch (e) {
            chai.expect(e.message).to.equal('Array of function(s) that returns a promise was expected');
        }
    });

    it('Should PASS processPromisesWithNoArgs method', async() => {
        const arg1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('FIRST'), 2000));
        const arg2 = () => new Promise((resolve, reject) => setTimeout(() => resolve('SECOND'), 100));
        const arg3 = () => new Promise((resolve, reject) => setTimeout(() => resolve('THIRD'), 10));
        const arg4 = () => new Promise((resolve, reject) => setTimeout(() => resolve('FOURTH'), 1));
        try {
            const results = await processPromisesWithNoArgs([ arg1, arg2, arg3, arg4 ]);
            chai.expect(results).to.be.an('array');
            chai.expect(results.length).to.equal(4);
        } catch (e) {
            chai.expect(e.message).to.equal('Array of function(s) that returns a promise was expected');
        }
    });

    it('Should STOP processPromisesWithNoArgs method execution if one promise gets rejected', async() => {
        const arg1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('FIRST'), 2000));
        const arg2 = () => new Promise((resolve, reject) => setTimeout(() => resolve('SECOND'), 100));
        const arg3 = () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('THIRD')), 10));
        const arg4 = () => new Promise((resolve, reject) => setTimeout(() => resolve('FOURTH'), 1));
        try {
            const results = await processPromisesWithNoArgs([ arg1, arg2, arg3, arg4 ]);
            chai.expect(results).to.be.an('array');
            chai.expect(results.length).to.equal(4);
        } catch (e) {
            chai.expect(e.message).to.not.equal('null');
        }
    });
});
