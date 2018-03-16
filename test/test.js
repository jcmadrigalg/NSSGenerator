/**
 * @author Juan Carlos Madrigal - jcmadrigalg
 */
const itParam = require('mocha-param').itParam;
const Assert = require('chai').assert;
const sut = require('../library/Functions');
let parameterizedValues = [], result;

describe('Function', function() {
	describe('Multiplier', function() {
		parameterizedValues = [
			{ parameter: 2, binaryValue: 1, expectedResult: 2  },
			{ parameter: 2, binaryValue: 2, expectedResult: 4  },
			{ parameter: 5, binaryValue: 1, expectedResult: 5  },
			{ parameter: 5, binaryValue: 2, expectedResult: 10 },
			{ parameter: 9, binaryValue: 1, expectedResult: 9  },
			{ parameter: 9, binaryValue: 2, expectedResult: 18 }
		];
		itParam('Number * binary value should return the expected result', parameterizedValues, function(value) {
			result = sut.Multiplier(value.parameter, value.binaryValue);
			Assert.equal(result, value.expectedResult, (value.parameter + ' * ' + value.binaryValue + ' must be ' + value.expectedResult));
		});
	});

	describe('ConvertNumberTo1Digit', function() {
		parameterizedValues = [
			{ parameter: 10, expectedResult: 1 },
			{ parameter: 13, expectedResult: 4 },
			{ parameter: 15, expectedResult: 6 },
			{ parameter: 18, expectedResult: 9 },
		];
		itParam('Number with 2 digits must be converted to 1 digit', parameterizedValues, function(value) {
			result = sut.ConvertNumberTo1Digit(value.parameter);
			Assert.equal(result, value.expectedResult, (value.parameter + ' must be turn to ' + value.expectedResult));
		});
	});

	describe('NextUpperDecimalNumber', function() {
		parameterizedValues = [
			{ parameter: 15, expectedResult: 20 },
			{ parameter: 20, expectedResult: 30 },
			{ parameter: 42, expectedResult: 50 },
			{ parameter: 75, expectedResult: 80 },
		];
		itParam('Get the upper decimal number to the parameter value', parameterizedValues, function(value) {
			result = sut.NextUpperDecimalNumber(value.parameter);
			Assert.equal(result, value.expectedResult, ('For ' + value.parameter + ' must be ' + value.expectedResult));
		});
	});

	describe('GenerateNSS', function() {
		parameterizedValues = [
			{ baseNSS: '1780581644', verifiedDigit: '8', expectedResult: '17805816448' },
			{ baseNSS: '1424361805', verifiedDigit: '6', expectedResult: '14243618056' },
		];
		itParam('Base NSS + Verified Digit should return a complete NSS', parameterizedValues, function(value) {
			result = sut.GenerateNSS(value.baseNSS, value.verifiedDigit);
			Assert.equal(result, value.expectedResult, (value.baseNSS + ' + ' + value.verifiedDigit + ' must be ' + value.expectedResult));
		});
	});

	describe('GenerateRandomNSSBaseNumber', function() {
		parameterizedValues = [1, 2, 3, 4, 5];
		itParam('Random number must have length of 10 digits', parameterizedValues, function(totalNumberExecutions) {
			result = sut.GenerateRandomNSSBaseNumber();
			Assert.equal(result.length, 10, ('Random generated number ' + result + ' must have a length of 10 digits'));
		});
	});

	describe('QuantityOfRandomNSSToGenerate', function() {
		parameterizedValues = [
			{ parameter: 5, expectedResult: 5 },
			{ parameter: 1000, expectedResult: 1000 },
			{ parameter: undefined, expectedResult: 1 }
		];
		itParam('Should return a number of NSS to be generated', parameterizedValues, function(value) {
			result = sut.QuantityOfRandomNSSToGenerate(value.parameter);
			Assert.equal(result, value.expectedResult, (value.parameter + ' must be ' + value.expectedResult));
		});
	});
});