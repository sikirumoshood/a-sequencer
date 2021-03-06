/* eslint-env mocha */
const chai = require('chai');
const Sequencer = require('../../');

describe('INTEGRATION TEST FOR SEQUENCER', () => {
	it('Should SET useArgs, mixed and chainResults to false', () => {
		const SQ = new Sequencer();
		chai.expect(SQ.getUseArgs()).to.equal(false);
		chai.expect(SQ.getMixed()).to.equal(false);
		chai.expect(SQ.getChainResult()).to.equal(false);
	});

	it('Should SET useArgs to false, as supplied useArgs is not BOOLEAN', () => {
		const SQ = new Sequencer({ useArgs: '' });
		chai.expect(SQ.getUseArgs()).to.equal(false);
	});

	it('Should SET useArgs property to true', () => {
		const SQ = new Sequencer({ useArgs: true });
		chai.expect(SQ.getUseArgs()).to.equal(true);
	});

	it('Should SET chainResult to false, as supplied chainResult is not BOOLEAN', () => {
		const SQ = new Sequencer({ chainResult: '' });
		chai.expect(SQ.getChainResult()).to.equal(false);
	});

	it('Should SET chainResult property to true', () => {
		const SQ = new Sequencer({ chainResult: true });
		chai.expect(SQ.getChainResult()).to.equal(true);
	});

	it('Should SET mixed property to true', () => {
		const SQ = new Sequencer({ mixed: true });
		chai.expect(SQ.getMixed()).to.equal(true);
	});

	it('Should UPDATE useArgs', () => {
		const SQ = new Sequencer();
		chai.expect(SQ.getUseArgs()).to.equal(false);
		SQ.setUseArgs(true);
		chai.expect(SQ.getUseArgs()).to.equal(true);
	});

	it('Should FAIL TO UPDATE useArgs', () => {
		const SQ = new Sequencer();
		chai.expect(SQ.getUseArgs()).to.equal(false);
		SQ.setUseArgs('');
		chai.expect(SQ.getUseArgs()).to.equal(false);
	});

	it('Should FAIL TO UPDATE mixedArgs', () => {
		const SQ = new Sequencer();
		chai.expect(SQ.getMixed()).to.equal(false);
		SQ.setMixed('1');
		chai.expect(SQ.getMixed()).to.equal(false);
	});

	it('Should UPDATE mixedArgs', () => {
		const SQ = new Sequencer();
		chai.expect(SQ.getMixed()).to.equal(false);
		SQ.setMixed(true);
		chai.expect(SQ.getMixed()).to.equal(true);
	});

	it('Should UPDATE chainResult', () => {
		const SQ = new Sequencer();
		chai.expect(SQ.getChainResult()).to.equal(false);
		SQ.setChainResult(true);
		chai.expect(SQ.getChainResult()).to.equal(true);
	});

	it('Should FAIL TO UPDATE chainResult', () => {
		const SQ = new Sequencer();
		chai.expect(SQ.getChainResult()).to.equal(false);
		SQ.setChainResult('');
		chai.expect(SQ.getChainResult()).to.equal(false);
	});

	it('Should CALL processPromisesWithArgs', async () => {
		const SQ = new Sequencer({ useArgs: true });
		const results = await SQ.runSequence([ { name: (arg) => Promise.resolve(arg), args: [ 'First' ] } ]);
		chai.expect(results.length).to.equal(1);
		chai.expect(results[0]).to.equal('First');
	});

	it('Should CALL processPromisesWithNoArgs', async () => {
		const SQ = new Sequencer({ useArgs: false });
		const results = await SQ.runSequence([ () => Promise.resolve('First') ]);
		chai.expect(results.length).to.equal(1);
		chai.expect(results[0]).to.equal('First');
	});

	it('Should CALL processPromises, MIXED OPTION IS TRUE', async () => {
		const SQ = new Sequencer({ mixed: true });
		const arg1 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 1000));
		const results = await SQ.runSequence([ () => Promise.resolve('First'), { name: arg1, args: [ 'SECOND' ] } ]);
		chai.expect(results.length).to.equal(2);
		chai.expect(results[0]).to.equal('First');
	});

	it('Should CALL processPromises, MIXED AND USEARGS OPTIONS ARE TRUE', async () => {
		const SQ = new Sequencer({ mixed: true, useArgs: true });
		const arg1 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 1000));
		const results = await SQ.runSequence([ () => Promise.resolve('First'), { name: arg1, args: [ 'SECOND' ] } ]);
		chai.expect(results.length).to.equal(2);
		chai.expect(results[0]).to.equal('First');
	});

	it('Should CALL processPromisesAndChainResults, CHAIN-RESULT OPTION is true', async () => {
		const SQ = new Sequencer({ chainResult: true });
		const arg1 = (arg) => new Promise((resolve, reject) => setTimeout(() => resolve(arg), 1000));
		const arg2 = (arg) => Promise.resolve(arg.toLowerCase());
		const result = await SQ.runSequence([ { name: arg1, args: [ 'I WAS RESOLVED' ] }, arg2 ]);
		chai.expect(result).to.be.a('string');
		chai.expect(result).to.equal('i was resolved');
	});
});
