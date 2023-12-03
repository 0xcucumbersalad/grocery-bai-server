const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema(
     {
          category: {
               required: true,
               type: String
          }
     }
)

const Product =  mongoose.model('products1', dataSchema)



module.exports = Product;