import Joi from 'joi';

const mustBeFilled = 'All fields must be filled';
const invalidLogin = 'Incorrect email or password';

export default Joi.object({
  email: Joi.string()
    .email()
    .required()
    .empty()
    .messages({
      'string.base': '400|"email" must be a string',
      'string.empty': `400|${mustBeFilled}`,
      'any.required': `400|${mustBeFilled}`,
      'string.email': `401|${invalidLogin}`,
    }),
  password: Joi.string()
    .required()
    .min(6)
    .empty()
    .messages({
      'string.base': '400|"password" must be a string',
      'string.empty': `400|${mustBeFilled}`,
      'any.required': `400|${mustBeFilled}`,
      'string.min': `401|${invalidLogin}`,
    }),
});
