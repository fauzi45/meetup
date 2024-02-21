const Joi = require('joi');
const Boom = require('boom');

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().description('Person\'s full name'),
    email: Joi.string().required().description('Active email'),
    password: Joi.string().min(8).max(20).required().description('Should be between 8-20 characters'),
    confirmPassword: Joi.string().min(8).max(20).required().valid(Joi.ref('password')).description('Should match password')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().description('Active email'),
    password: Joi.string().min(8).max(20).required().description('Should be between 8-20 characters')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const createCategoryValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    dataToken: Joi.object().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const createMeetupValidation = (data) => {
  const timeRegex = /^\d{2}:\d{2}/;
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category_id: Joi.number().required(),
    lat: Joi.string().required(),
    long: Joi.string().required(),
    date: Joi.date().required(),
    start_time: Joi.string().regex(timeRegex).required(),
    finish_time: Joi.string().regex(timeRegex).required(),
    capacity: Joi.number().required(),
    dataToken: Joi.object().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const imageValidation = (data) => {
  const schema = Joi.object({
    image: Joi.array().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
}; 

const idValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
}; 

module.exports = {
  registerValidation,
  loginValidation,
  idValidation,
  imageValidation,

  createCategoryValidation,
  createMeetupValidation
};
