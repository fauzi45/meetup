const Router = require("express").Router();
const { decryptObject } = require("../../utils/decrypt");
const Middleware = require("../middlewares/authMiddleware");
const Validation = require("../helpers/validationHelper");
const AuthHelper = require("../helpers/authHelper");
const GeneralHelper = require("../helpers/generalHelper");

const fileName = "server/api/auth.js";

const register = async (request, reply) => {
  try {
    const { username, email, password, confirmPassword } = request.body;

    const decryptUsername = decryptObject(username);
    const decryptEmail = decryptObject(email);
    const decryptPassword = decryptObject(password);
    const decryptConfirmPosition = decryptObject(confirmPassword);
    Validation.registerValidation({
      username: decryptUsername,
      email: decryptEmail,
      password: decryptPassword,
      confirmPassword: decryptConfirmPosition,
    });
    const response = await AuthHelper.registerUser({
      username: decryptUsername,
      email: decryptEmail,
      password: decryptPassword,
      confirmPassword: decryptConfirmPosition,
    });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, "register", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const login = async (request, reply) => {
  try {
    const { email, password } = request.body;
    const decryptEmail = decryptObject(email);
    const decryptPassword = decryptObject(password);
    Validation.loginValidation({
      email: decryptEmail,
      password: decryptPassword,
    });
    const response = await AuthHelper.login({
      email: decryptEmail,
      password: decryptPassword,
    });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, "login", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

// eslint-disable-next-line arrow-body-style
const hello = async (request, reply) => {
  // SAMPLE API WITH JWT MIDDLEWARE
  return reply.send("HELLO");
};

Router.post("/api/auth/register", register);
Router.post("/api/auth/login", login);
Router.get("/hello", Middleware.validateToken, hello);

module.exports = Router;
