import Joi from 'joi'

const nameValidateSchema = Joi.object({
  firstName: Joi.string().required().trim().messages({
    'string.base': 'First name must be a string.',
    'string.empty': 'First name is required.',
    'any.required': 'First name is required.',
  }),
  lastName: Joi.string().trim().messages({
    'string.base': 'Last name must be a string.',
  }),
})

const addressValidateSchema = Joi.object({
  street: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
})

const ordersValidateSchema = Joi.object({
  productName: Joi.string(),
  price: Joi.number(),
  quantity: Joi.number(),
})

const userSchemaValidateJoi = Joi.object({
  userId: Joi.number().required().messages({
    'number.base': 'User ID must be a number.',
    'number.empty': 'User ID is required.',
    'any.required': 'User ID is required and must be unique.',
  }),
  username: Joi.string().required().trim().messages({
    'string.base': 'Username must be a string.',
    'string.empty': 'Username is required.',
    'any.required': 'Username is required and must be unique.',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string.',
    'string.empty': 'Password is required.',
    'any.required': 'Password is required.',
  }),
  fullName: nameValidateSchema.required().messages({
    'object.base': 'Full name must be an object.',
    'any.required': 'Full name is required.',
  }),
  age: Joi.number(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Email must be a string.',
      'string.empty': 'Email is required.',
      'string.email': 'Email must be a valid email address.',
      'any.required': 'Email is required.',
    }),

  isActive: Joi.boolean(),
  hobbies: Joi.array().items(Joi.string()),
  address: addressValidateSchema,
  orders: Joi.array().items(ordersValidateSchema),
  isDeleted: Joi.boolean(),
})

export default userSchemaValidateJoi
