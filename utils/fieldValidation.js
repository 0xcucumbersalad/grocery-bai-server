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
               name: Joi.string().required(),
               schedule: Joi.string().required(),
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

const validateDeleteItem = (body) => {
     const schema = Joi.object(
          {
               userId: Joi.string().required(),
               itemId: Joi.string().required()
          }
     )
     return schema.validate(body)
}


const validateWishList = (body) => {
     const schema = Joi.object(
          {
               userId: Joi.string().required(),
               list: Joi.array().required()
          }
     )
     return schema.validate(body)
}

const validateDeleteWishlist = (body) => {
     const schema = Joi.object(
          {
               userId: Joi.string().required(),
               id: Joi.string().required()
          }
     )
     return schema.validate(body)
}

const validateUpdateWishlist = (body) => {
     const schema = Joi.object(
          {
               userId: Joi.string().required(),
               id: Joi.string().required(),
               list: Joi.array().required()
          }
     )
     return schema.validate(body)
}

const validuserId = (body) => {
     const schema = Joi.object(
          {
               userId: Joi.string().required()
          }
     )
     return schema.validate(body)
}

const validateProduct = (body) => {
     const schema = Joi.object(
          {
               category: Joi.string().required(),
               userId: Joi.string().required(),
               product: Joi.object().required()
          }
     )
     return schema.validate(body)
}

module.exports = { validatePassword, validateLogin, validateItem, validateUpdateItem, validateDeleteItem, validateWishList
, validuserId, validateDeleteWishlist, validateUpdateWishlist, validateProduct }
