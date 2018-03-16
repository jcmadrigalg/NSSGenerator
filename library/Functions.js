/**
 * @author Juan Carlos Madrigal - jcmadrigalg
 */
/**
 * Multiply the value of the NSS digit by the digit of the binary string
 * @param {number} nssDigit NSS digit
 * @param {number} binaryDigit Binary digit
 * @returns {number} Result of both digits multiplication
 */
var Multiplication = function(nssDigit, binaryDigit){
	return nssDigit * binaryDigit;
}

/**
 * Converts an integer value of 2 digits, to a value of 1 single digit.
 * Ex. Number 17 will be converted to: 8
 * @param {number} twoDigitsNumber Number of 2 digits to be made of 1 single digit
 * @returns {number} Sum of both digits, converted to 1 digit
 */
var TurnNumberTo1DigitBySum = function(twoDigitsNumber){
	let numberToString = twoDigitsNumber.toString();
	let firstDigit = parseInt(numberToString[0]);
	let secondDigit = parseInt(numberToString[1]);

	return firstDigit + secondDigit;
}

/**
 * Indicates the decimal number to which the subtraction will be made, of the sum of the multiplied numbers
 * @param {number} multipliedSumNumbersResult Sum of the numbers array
 * @returns {number} Decimal to be used for subtraction
 */
var CalculateNextUpperDecimalNumberToRest = function(multipliedSumNumbersResult){
	let numberToString = multipliedSumNumbersResult.toString();
	let decimalValue_FirstDigit = parseInt(numberToString[0]);
	let upperDecimalValue = Sum1ToDecimalValueFirstDigit(decimalValue_FirstDigit) * 10;

	return upperDecimalValue;
}

/**
 * Return the complete NSS along with verified digit
 * @param {string} NSSwithoutVerifiedDigit String generated randomly, without Verified Digit
 * @param {string} VerifiedDigitCalculated Verified Digit calculated by algorithm
 * @returns {string} Complete string of NSS with Verified Digit included
 */
var GenerateNSSwithVerifiedDigit = function(NSSwithoutVerifiedDigit, VerifiedDigitCalculated){
	return NSSwithoutVerifiedDigit + VerifiedDigitCalculated;
}

/**
 * Generates the base for a new NSS, without Verified Digit
 * @returns {string} String of 10 characters to be the base for a new NSS
 */
var NSSBaseRandomNumberGenerator = function(){
	return (Math.floor(Math.random() * 8888888888) + 1111111111).toString();
}

/**
 * Get the number of NSS to be generated, indicated on the console by Param # 1
 * @param {*} consoleParam Number of NSS to be random generated
 * @returns {number} Number of NSS to be generated
 */
var DefineQuantityOfRandomNSSToGenerate = function(consoleParam) {
	let quantityOfNSSToGenerate;

	if(consoleParam !== undefined)
		quantityOfNSSToGenerate = consoleParam;
	else
		quantityOfNSSToGenerate = 1;

	return quantityOfNSSToGenerate
}

//////////////////////////////////////////////////////////////////////
/**
 * Get the multiplied numbers for each digit of the secuence
 * @param {string} nss Base random number generated for new NSS
 * @param {string} binary Binary base
 * @returns {array} Array of numbers multiplied
 */
var GetMultipliedArrayNumbers = function(nss, binary) {
	let multipliedArrayNumbers = [];

	for(let i = 0; i < nss.length; i++)
		multipliedArrayNumbers[i] = Multiplication(nss[i], binary[i]);
	
	return multipliedArrayNumbers
}

/**
 * Get the same array of multiplied numbers, but where number is of 2 digits, are converted to 1 digit
 * @param {string} nss Base random number generated for new NSS
 * @param {array} multipliedArrayNumbers Array of numbers multiplied
 * @returns {array} Same multiplied array of numbers, but filter to 1 digit
 */
var GetMultipliedArrayNumbersWithSumTo1Digit = function(nss, multipliedArrayNumbers) {
	for(let i = 0; i < nss.length; i++)
		// The NSS Verified Digit algorithm dictates that numbers with 2 digits, each digit by separte will be sum to make 1
		if(multipliedArrayNumbers[i] > 9)
			multipliedArrayNumbers[i] = TurnNumberTo1DigitBySum(multipliedArrayNumbers[i]);

	return multipliedArrayNumbers;
}

/**
 * Get the total sum of all the numbers on the array
 * @param {string} nss Base random number generated for new NSS
 * @param {array} multipliedArrayNumbers Array of numbers multiplied
 * @returns {number} Total of sum of all the numbers on the array
 */
var GetMultipliedSumNumbers = function(nss, multipliedArrayNumbers) {
	let multipliedSumNumbers = 0;

	for(let i = 0; i < nss.length; i++)
		multipliedSumNumbers += multipliedArrayNumbers[i];

	return multipliedSumNumbers;
}

/**
 * Get the Verified Digit that complete the NSS
 * @param {number} multipliedSumNumbers Total of sum of all the numbers on the NSS array
 * @returns {number} Calculated Verified Digit to complete the NSS
 */
var GetVerifiedDigit = function(multipliedSumNumbers) {
	let verifiedDigit = 0;

	if(multipliedSumNumbers % 10)
		verifiedDigit = CalculateNextUpperDecimalNumberToRest(multipliedSumNumbers) - multipliedSumNumbers;

	return verifiedDigit;
}

//////////////////////////////////////////////////////////////////////
/**
 * Private function to add 1 to the value that will be used to generate the upper decimal
 * @param {number} firstDigit Digit that will be increased 1
 * @returns {number} Digit increased by 1 to its value
 */
var Sum1ToDecimalValueFirstDigit = function(firstDigit){
	return firstDigit + 1;
}
//////////////////////////////////////////////////////////////////////

var GetNewNSS = function(nss, binary) {
	let multipliedArrayNumbers = [];

	multipliedArrayNumbers = GetMultipliedArrayNumbers(nss, binary);
	multipliedArrayNumbers = GetMultipliedArrayNumbersWithSumTo1Digit(nss, multipliedArrayNumbers);
	
	let multipliedSumNumbers = GetMultipliedSumNumbers(nss, multipliedArrayNumbers);
	let verifiedDigit = GetVerifiedDigit(multipliedSumNumbers);
	let nssConDigitoVerificador = GenerateNSSwithVerifiedDigit(nss, verifiedDigit);
	
	return nssConDigitoVerificador;
}

//////////////////////////////////////////////////////////////////////
/**
 * @module Global functions
 */
module.exports = {
	Multiplier: Multiplication,
	ConvertNumberTo1Digit: TurnNumberTo1DigitBySum,
	NextUpperDecimalNumber: CalculateNextUpperDecimalNumberToRest,
	GenerateNSS : GenerateNSSwithVerifiedDigit,
	GenerateRandomNSSBaseNumber: NSSBaseRandomNumberGenerator,
	QuantityOfRandomNSSToGenerate: DefineQuantityOfRandomNSSToGenerate,
	GetMultipliedArrayNumbers: GetMultipliedArrayNumbers,
	GetMultipliedArrayNumbersWithSumTo1Digit: GetMultipliedArrayNumbersWithSumTo1Digit,
	GetMultipliedSumNumbers: GetMultipliedSumNumbers,
	GetVerifiedDigitForNSS: GetVerifiedDigit,
	GetNewNSS: GetNewNSS
}
