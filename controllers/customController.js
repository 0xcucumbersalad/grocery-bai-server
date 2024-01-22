require("dotenv").config()
const CustomProduct = require("../models/customproduct")
const mongoose = require("mongoose")
const express = require("express")

const {validateProduct} = require("../utils/fieldValidation")

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


          if (category) return res.status(200).json(await CustomProduct.find({category: category}).limit(100))

          const data = await CustomProduct.find()
          res.status(200).json(data)
     }
     catch(error) {
          res.status(500).json({message: error.message})
     }
}

const getCategory1 = async (req, res) => {
     try {

          const random_category = ["Fresh Meat & Seafoods", "Fresh Produce", "Frozen Goods", "Ready To Heat & Eat Items", "Ready to Cook", "Chilled & Dairy Items", "International Goods","Bakery", "Pantry", "Snacks", "Beverage", "Health & Beauty", "Babies & Kids", "Home Care", "DIY/Hardware", "Pet Care", "Health & Hygiene Essentials"]

          
          const random = Math.floor(Math.random() *    random_category.length);


          const category = req.query.category


          if (category == null) return res.status(200).json(await CustomProduct.find({category: random_category[random]}).limit(100))

          const data = await CustomProduct.find({category: category}).limit(20)
          res.status(200).json(data)
     }
     catch(error) {
          res.status(500).json({message: error.message})
     }
}

const createProduct = async(req, res) => {
     try {
          const { error } = validateProduct(req.body)
          if (error) return res.status(400).json({message: error.details[0].message})
          //if (req.user.id != req.body.userId) return res.status(403).json({message: "Error, Please Try Again"})

          const product = await CustomProduct.create({
               ...req.body
          })

          res.status(200).json(product)
     } catch (error) {
          console.log(error)
          res.status(500).json({message: error.message})
     }
}


const searchProduct = async (req, res) => {
     const item = req.query.item
     try {
          const data = await CustomProduct.find({
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

module.exports = { getCategory, searchProduct, getCategory1, createProduct }