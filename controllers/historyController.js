require("dotenv").config()
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

const { validateItem, validateUpdateItem, validateDeleteItem } = require("../utils/fieldValidation")

const HistoryItem = require("../models/historyitems")

const authenticateToken = require("../middleware/authenticateToken")

const express = require("express")
const { ObjectId } = require("mongodb")
const app = express()
const router = express.Router()
app.use(express.json())

const mongoString = process.env.URI
mongoose.connect(mongoString)


const getItems = async(req, res) => {
     try {
          
          const itemId = req.query.itemId
          
          if(itemId == null) {

          const id = new mongoose.Types.ObjectId(req.user.id)

          const item = await HistoryItem.find({userId: id}, {__v: 0})
          if (item) return res.status(200).json({item})
          if (!item) return res.status(200).json({item})
     }
     else {
          const item = await HistoryItem.find({_id: itemId}, {__v: 0})
          if (item) return res.status(200).json({item})
          if (!item) return res.status(200).json({item})
     }

     } catch (error) {
          console.log(error)
          res.status(500).json({message: error.message})
     }
}

const postItem = async(req, res) => {
     try {
          const { error } = validateItem(req.body)
          if (error) return res.status(400).json({message: error.details[0].message})
          //if (req.user.id != req.body.userId) return res.status(403).json({message: "Error, Please Try Again"})

          const total = []

          req.body.items.map((item) => {
               total.push(item.price)
          })

          sum = total.reduce((a, b) => a + b, 0);

          const item = await HistoryItem.create({
               userId: req.user.id,
               ...req.body,
               total: sum
          })
          res.status(200).json(item)
     } catch (error) {
          res.status(500).json({message: error.message})
     }
}

const updateItem = async(req, res) => {
     try {
          const { error } = validateUpdateItem(req.body)
          if (error) return res.status(400).json({message: error.details[0].message})
          if (req.user.id != req.body.userId) return res.status(403).json({message: "Error, Please Try Again"})

          const item = await HistoryItem.findOne({_id: req.body.itemId})
          if (!item) return res.status(400).json({message: "item does not exist"})
          if (item.userId != req.user.id) return res.status(403).json({message: "Error, Please Try Again"}) 

          const total = []

          req.body.items.map((item) => {
               total.push(HistoryItem.price)
          })

          sum = total.reduce((a, b) => a + b, 0);

          const updateItem = await HistoryItem.updateOne({_id: req.body.itemId}, {"$set": {items: req.body.items, total: sum }})

          res.status(200).json({message: "Item has been updated"})


     } catch (error) {
          res.status(500).json({message: error.message})
     }
}

const deleteItem = async(req, res) => {
     try {
          const { error } = validateDeleteItem(req.body)
          if (error) return res.status(400).json({message: error.details[0].message})
          if (req.user.id != req.body.userId) return res.status(403).json({message: "Error, Please Try Again"})

          const item = await HistoryItem.findOne({_id: req.body.itemId})
          if (!item) return res.status(400).json({message: "item does not exist"})
          console.log()
          if (item.userId != req.user.id) return res.status(403).json({message: "Error, Please Try Again"}) 

          const deleteItem = await HistoryItem.deleteOne({_id: req.body.itemId})

          res.status(200).json({message: "Item has been deleted"})

     } catch (error) {
          res.status(500).json({message: error.message})
     }
}


module.exports = { getItems, postItem, updateItem, deleteItem }