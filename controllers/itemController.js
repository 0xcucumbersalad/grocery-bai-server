require("dotenv").config()
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

const { validateItem, validateUpdateItem, validateDeleteItem } = require("../utils/fieldValidation")

const Item = require("../models/items")

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

          const id = new mongoose.Types.ObjectId(req.user.id)

          const item = await Item.find({userId: id}, {__v: 0})
          if (item) return res.status(200).json({item})
          if (!item) return res.status(200).json({item})

     } catch (error) {
          console.log(error)
          res.status(500).json({message: error.message})
     }
}

const postItem = async(req, res) => {
     try {
          const { error } = validateItem(req.body)
          if (error) return res.status(400).json({message: error.details[0].message})
          if (req.user.id != req.body.userId) return res.status(403).json({message: "Error, Please Try Again"})


          const item = await Item.create(req.body)
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

          const item = await Item.findOne({_id: req.body.itemId})
          if (!item) return res.status(400).json({message: "item does not exist"})
          if (item.userId != req.user.id) return res.status(403).json({message: "Error, Please Try Again"}) 

          const updateItem = await Item.replaceOne({_id: req.body.itemId}, {"$set": req.body.items })
          
          console.log(updateItem)

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

          const item = await Item.findOne({_id: req.body.itemId})
          if (!item) return res.status(400).json({message: "item does not exist"})
          if (item.userId != req.user.id) return res.status(403).json({message: "Error, Please Try Again"}) 

          const deleteItem = await Item.deleteOne({_id: req.body.itemId})

          res.status(200).json({message: "Item has been deleted"})

     } catch (error) {
          res.status(500).json({message: error.message})
     }
}

module.exports = { getItems, postItem, updateItem, deleteItem }