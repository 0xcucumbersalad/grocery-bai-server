const mongoose = require("mongoose")
const Joi =  require("joi")


const userSchema = new mongoose.Schema(
     {    
          first_name: {
               type: String,
               required: true
          },
          last_name: {
               type: String
          },
          email: {
               required: true,
               type: String,
               lowercase: true
          },
          password: String,

          date_created: {
               type: Date,
               default: new Date()
          }
     }
)

const User = mongoose.model('users', userSchema)

const validate = (user) => {
     const schema = Joi.object({
          first_name: Joi.string().required(),
          last_name: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required()
     })

     return schema.validate(user)
}



module.exports = { User, validate }