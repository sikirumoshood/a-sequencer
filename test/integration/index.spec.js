/* eslint-env mocha */
const chai = require('chai');
const Sequencer = require('../../src');

describe('INTEGRATION TEST FOR SEQUENCER', () => {
    it('Should SET useArgs to false', () => {
        const SQ = new Sequencer();
        chai.expect(SQ.getUseArgs()).to.equal(false);
    });

    it('Should SET useArgs to false, as supplied useArgs is not BOOLEAN', () => {
        const SQ = new Sequencer({ useArgs: '' });
        chai.expect(SQ.getUseArgs()).to.equal(false);
    });

    it('Should SET useArgs to true', () => {
        const SQ = new Sequencer({ useArgs: true });
        chai.expect(SQ.getUseArgs()).to.equal(true);
    });

    it('Should CALL processPromisesWithArgs', async() => {
        const SQ = new Sequencer({ useArgs: true });
        try {
            const results = await SQ.runSequence([ { name: (arg) => Promise.resolve(arg), args: [ 'First' ] } ]);
            chai.expect(results.length === 1);
            chai.expect(results[0] === 'First');
        } catch (e) {
            console.log(e.messge);
        }
    });

    it('Should CALL processPromisesWithNoArgs', async() => {
        const SQ = new Sequencer({ useArgs: false });
        try {
            const results = await SQ.runSequence([ () => Promise.resolve('First') ]);
            chai.expect(results.length === 1);
            chai.expect(results[0] === 'First');
        } catch (e) {
            console.log(e.messge);
        }
    });
});
