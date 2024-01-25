const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema(
     {
          userId: {
               type: mongoose.SchemaTypes.ObjectId,
               required: true
          },
          items: {
               type: Array,
               required: true
          }
     }
)

const Wishlist =  mongoose.model('userwishlist', dataSchema)



module.exports = Wishlist;