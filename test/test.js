/**
 * @author Juan Carlos Madrigal - jcmadrigalg
 */
const itParam = require('mocha-param');
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
		itParam('${value.parameter} * ${value.binaryValue} should return ${value.expectedResult}', parameterizedValues, function(value) {
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
		itParam('Number ${value.parameter} must be converted to ${value.expectedResult}', parameterizedValues, function(value) {
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
		itParam('The upper decimal number of ${value.parameter} should be ${value.expectedResult}', parameterizedValues, function(value) {
			result = sut.NextUpperDecimalNumber(value.parameter);
			Assert.equal(result, value.expectedResult, ('For ' + value.parameter + ' must be ' + value.expectedResult));
		});
	});

	describe('GenerateNSS', function() {
		parameterizedValues = [
			{ baseNSS: '1780581644', verifiedDigit: '8', expectedResult: '17805816448' },
			{ baseNSS: '1424361805', verifiedDigit: '6', expectedResult: '14243618056' },
		];
		itParam('${value.baseNSS} + ${value.verifiedDigit} should return the complete NSS of ${value.expectedResult}', parameterizedValues, function(value) {
			result = sut.GenerateNSS(value.baseNSS, value.verifiedDigit);
			Assert.equal(result, value.expectedResult, (value.baseNSS + ' + ' + value.verifiedDigit + ' must be ' + value.expectedResult));
		});
	});

	describe('GenerateRandomNSSBaseNumber', function() {
		parameterizedValues = [
			{ baseNSS: sut.GenerateRandomNSSBaseNumber() },
			{ baseNSS: sut.GenerateRandomNSSBaseNumber() },
			{ baseNSS: sut.GenerateRandomNSSBaseNumber() },
			{ baseNSS: sut.GenerateRandomNSSBaseNumber() },
			{ baseNSS: sut.GenerateRandomNSSBaseNumber() }
		];
		itParam('Random number ${value.baseNSS} must have length of 10 digits', parameterizedValues, function(value) {
			result = value.baseNSS;
			Assert.equal(result.length, 10, ('Random generated number ' + result + ' must have a length of 10 digits'));
		});
	});
	
	describe('QuantityOfRandomNSSToGenerate', function() {
		parameterizedValues = [
			{ parameter: 5, expectedResult: 5 },
			{ parameter: 1000, expectedResult: 1000 },
			{ parameter: undefined, expectedResult: 1 }
		];
		itParam('${value.parameter} should return ${value.expectedResult} NSS to be generated', parameterizedValues, function(value) {
			result = sut.QuantityOfRandomNSSToGenerate(value.parameter);
			Assert.equal(result, value.expectedResult, (value.parameter + ' must be ' + value.expectedResult));
		});
	});
});