const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema(
     {
          wishlist_id : {
               required: true,
               type: mongoose.SchemaTypes.ObjectId
          },
          randomized: {
               required: true,
               type: String
          }
     }
)

const Link =  mongoose.model('wish_link', dataSchema)



module.exports = Link;