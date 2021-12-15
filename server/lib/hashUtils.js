/**
 * Hashing uses SHA256, 
 * Hash value is 256 bits, 32 bytes, 64 hex digits
 */
const { createHash, randomBytes} = require('crypto');

const createSHA256Hash = (data, salt = '') => {
  return createHash('sha256').update(data + salt).digest('hex');
}

const compareHash = (attempted, stored, salt) => {
  return stored === createSHA256Hash(attempted, salt);
}

const createRandom256BitInHex = () => { 
  /* used to generate salt as well as new hash*/
  return randomBytes(32).toString('hex');
}

module.exports = {
  createSHA256Hash,
  compareHash,
  createRandom256BitInHex
}