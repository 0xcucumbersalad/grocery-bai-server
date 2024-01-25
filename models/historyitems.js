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

const HistoryItems =  mongoose.model('historyItems', itemSchema)



module.exports = HistoryItems;