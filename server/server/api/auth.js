const Router = require('express').Router();
const Decryptor = require('../../utils/decrypt');
const Middleware = require('../middlewares/authMiddleware');
const Validation = require('../helpers/validationHelper');
const AuthHelper = require('../helpers/authHelper');
const GeneralHelper = require('../helpers/generalHelper');

const fileName = 'server/api/auth.js';

const register = async (request, reply) => {
  try {
    const decryptedData = Decryptor.decryptObject(request.body);
    Validation.registerValidation(decryptedData);

    const { username, email, password } = decryptedData;
    const response = await AuthHelper.registerUser({ username, email, password });
    
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'register', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

const login = async (request, reply) => {
  try {
    const decryptedData = Decryptor.decryptObject(request.body);
    Validation.loginValidation(decryptedData);
    const { email, password } = decryptedData;
    const response = await AuthHelper.login({ email, password });
    
    return reply.send(response);
  } catch (err) {
    console.log([fileName, 'login', 'ERROR'], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
}

// eslint-disable-next-line arrow-body-style
const hello = async (request, reply) => {
  // SAMPLE API WITH JWT MIDDLEWARE 
  return reply.send('HELLO');
}

Router.post('/api/register', register);
Router.post('/api/login', login);
Router.get('/hello', Middleware.validateToken, hello);

module.exports = Router;