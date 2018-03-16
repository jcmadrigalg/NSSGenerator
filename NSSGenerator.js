/**
 * @author Juan Carlos Madrigal - jcmadrigalg
 */
const functions = require('./library/Functions');
var global = require('./library/Global');

var quantityOfNSSToGenerate = functions.QuantityOfRandomNSSToGenerate(process.argv[2]);
//var directoryToCreateFile = process.argv[3];

for(var i = 0; i < quantityOfNSSToGenerate; i++){
	global.NSS[i] = functions.GenerateRandomNSSBaseNumber();
	global.NSS[i] = functions.GetNewNSS(global.NSS[i], global.Binary);
	console.log(global.NSS[i]);
}