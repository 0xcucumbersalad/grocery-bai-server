const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema(
     {
          userId: mongoose.SchemaTypes.ObjectId,
          name: {
               type: String,
               required: true
          },
          schedule: {
               type: String,
               required: true
          },
          items: [],
          dateCreated: {
               type: Date,
               default: new Date()
          },
          total: Number
     }
)

const Items =  mongoose.model('userItems', itemSchema)



module.exports = Items;