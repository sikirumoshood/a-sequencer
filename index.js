const {
	processPromisesWithArgs,
	processPromisesWithNoArgs,
	processPromises,
	processPromisesAndChainResults
} = require('./util/utils');

function Sequencer(options = {}) {
	const _options = options;
	if (!_options.useArgs || typeof _options.useArgs !== 'boolean') {
		_options.useArgs = false;
	}

	if (!_options.mixed || typeof _options.mixed !== 'boolean') {
		_options.mixed = false;
	}

	if (!_options.chainResult || typeof _options.chainResult !== 'boolean') {
		_options.chainResult = false;
	}

	this.runSequence = function(promises) {
		if (_options.chainResult) {
			return processPromisesAndChainResults(promises);
		} else if (_options.mixed) {
			return processPromises(promises);
		} else if (_options.useArgs) {
			return processPromisesWithArgs(promises);
		} else {
			return processPromisesWithNoArgs(promises);
		}
	};

	this.getUseArgs = function() {
		return _options.useArgs;
	};

	this.getMixed = function() {
		return _options.mixed;
	};

	this.getChainResult = function() {
		return _options.chainResult;
	};

	this.setUseArgs = function(value) {
		if (typeof value === 'boolean') {
			_options.useArgs = value;
		}
	};

	this.setMixed = function(value) {
		if (typeof value === 'boolean') {
			_options.mixed = value;
		}
	};

	this.setChainResult = function(value) {
		if (typeof value === 'boolean') {
			_options.chainResult = value;
		}
	};
}

module.exports = Sequencer;
