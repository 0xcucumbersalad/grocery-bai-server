const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema(
     {
          userId: {
               type: mongoose.SchemaTypes.ObjectId,
               required: true
          },
          list: {
               type: Array,
               required: true
          }
     }
)

const Wishlist =  mongoose.model('userwishlist', dataSchema)



module.exports = Wishlist;