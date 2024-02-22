const CryptoJS = require("crypto-js")
const {AES} = require('crypto-js');
const secretKey = process.env.SECRET_KEY || 'super-secret-key';

const decryptObject = data => {
    try {
      if (typeof data === 'object') {
        return AES.decrypt(JSON.stringify(data), 'secret').toString(CryptoJS.enc.Utf8);
      }
      if (typeof data === 'string') {
        return AES.decrypt(data, 'secret').toString(CryptoJS.enc.Utf8);
      }
    } catch (error) {
      Promise.reject(error)
    }
  }

const decryptTextPayload = (token) => {
    try {
        const bytes = CryptoJS.AES.decrypt(token, secretKey)
        return bytes.toString(CryptoJS.enc.Utf8)
    } catch (error) {
        return null
    }
}

module.exports = {
    decryptObject,
    decryptTextPayload
};