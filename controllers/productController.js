require("dotenv").config()
const Model = require('../models/product')
const mongoose = require("mongoose")
const express = require("express")

const app = express()
const router = express.Router()
app.use(express.json())

const mongoString = process.env.URI
mongoose.connect(mongoString)


const getCategory = async (req, res) => {
     try {

          const random_category = ["Fresh Meat & Seafoods", "Fresh Produce", "Frozen Goods", "Ready To Heat & Eat Items", "Ready to Cook", "Chilled & Dairy Items", "International Goods","Bakery", "Pantry", "Snacks", "Beverage", "Health & Beauty", "Babies & Kids", "Home Care", "DIY/Hardware", "Pet Care", "Health & Hygiene Essentials"]

          
          const random = Math.floor(Math.random() *    random_category.length);


          const category = req.query.category


          if (category == null) return res.status(200).json(await Model.find({category: random_category[random]}).limit(100))

          const data = await Model.find({category: category})
          res.status(200).json(data)
     }
     catch(error) {
          res.status(500).json({message: error.message})
     }
}

const searchProduct = async (req, res) => {
     const item = req.query.item
     try {
          const data = await Model.find({
               "product.title": {
                    '$regex': item
               }
          })
          res.status(200).json(data)
     }
     catch(error) {
          res.status(500).json({message: error.message})
     }
}

module.exports = { getCategory, searchProduct }