const Joi = require("joi")



const validatePassword = (user) => {
     const schema = Joi.object(
          {
               password: Joi.string().required()
          }
     )
     return schema.validate(user)
}

const validateLogin = (body) => {
     const schema = Joi.object(
          {
               email: Joi.string().required(),
               password: Joi.string().required()
          }
     )
     return schema.validate(body)
}

const validateItem = (body) => {
     const schema = Joi.object(
          {
               userId: Joi.string().required(),
               items: Joi.array().required()
          }
     )
     return schema.validate(body)
}

const validateUpdateItem = (body) => {
     const schema = Joi.object(
          {
               userId: Joi.string().required(),
               itemId: Joi.string().required(),
               items: Joi.array().required()
          }
     )
     return schema.validate(body)
}

module.exports = { validatePassword, validateLogin, validateItem, validateUpdateItem }
