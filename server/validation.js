const Joi = require("joi");

const authValidation = (signupObject) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6),
  });

  return schema.validate(signupObject);
};

const workoutValidation = (workoutObject) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().required(),
    notes: Joi.string().required(),
    date: Joi.date().required(),
    exercises: Joi.array().min(1),
  });

  return schema.validate(workoutObject);
};

module.exports.authValidation = authValidation;
module.exports.workoutValidation = workoutValidation;
