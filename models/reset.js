const mongoose = require("mongoose")
const Joi =  require("joi")




const resetSchema = new mongoose.Schema(
     {    
          email: {
               required: true,
               type: String,
               lowercase: true
          },


          otp: {
               type: Number,
               required: true
          }
     }
)

const Reset = mongoose.model('otp', resetSchema)

module.exports = { Reset }