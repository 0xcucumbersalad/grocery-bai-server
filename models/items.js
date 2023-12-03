const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema(
     {
          userId: mongoose.SchemaTypes.ObjectId,
          items: [],
          dateCreated: {
               type: Date,
               default: new Date()
          }
     }
)

const Items =  mongoose.model('userItems', itemSchema)



module.exports = Items;