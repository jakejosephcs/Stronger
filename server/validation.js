const Joi = require("joi");

const authValidation = (signupObject) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6),
  });

  return schema.validate(signupObject);
};

module.exports.authValidation = authValidation;
