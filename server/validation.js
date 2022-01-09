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

const exerciseValidation = (exerciseObject) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
  });

  return schema.validate(exerciseObject);
};

module.exports.authValidation = authValidation;
module.exports.workoutValidation = workoutValidation;
module.exports.exerciseValidation = exerciseValidation;
