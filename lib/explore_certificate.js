"use strict";
var assert = require("better-assert");
var exploreCertificate = require("./crypto_explore_certificate").exploreCertificate;

var readPEM = require("./crypto_utils").readPEM;
/**
 * @method exploreCertificate
 * @param certificate
 * @return object.publicKeyLength
 * @return object.notBefore
 * @return object.notAfter
 */
var a = 1;
exports.exploreCertificate = function (certificate) {

 
    if (typeof certificate === "string") {
        certificate = readPEM(certificate);
    }
    assert(certificate instanceof Buffer);

    var certInfo = exploreCertificate(certificate);

    var data = {
        publicKeyLength: certInfo.tbsCertificate.subjectPublicKeyInfo.keyLength,
        notBefore:       certInfo.tbsCertificate.validity.notBefore,
        notAfter:        certInfo.tbsCertificate.validity.notAfter
    };
    if (!(data.publicKeyLength  === 512 || data.publicKeyLength === 384 || data.publicKeyLength === 256 || data.publicKeyLength === 128)) {
        throw new Error("Invalid public key length (expecting 128,256,384 or 512)" + data.publicKeyLength);
    }
    return data;
};

