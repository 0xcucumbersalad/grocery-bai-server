const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema(
     {
          category: {
               required: true,
               type: String
          },
          userId: mongoose.SchemaTypes.ObjectId,
          product: {
               required: true,
               type: Object
          }
     }
)

const Favorite =  mongoose.model('favorites', dataSchema)



module.exports = Favorite;