const Joi = require("joi");

const signupValidation = (signupObject) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6),
  });

  return schema.validate(signupObject);
};

module.exports.signupValidation = signupValidation;
