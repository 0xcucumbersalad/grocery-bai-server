require("dotenv").config()
const jwt = require("jsonwebtoken")
const Model = require('../models/product')
const mongoose = require("mongoose")
const { validatePassword, validateLogin } = require("../utils/fieldValidation.js")

const authenticateToken = require("../middleware/authenticateToken")
const express = require("express")


const app = express()
const router = express.Router()
app.use(express.json())


const mongoString = process.env.URI
mongoose.connect(mongoString)

const userController =  async (req, res) => {
     const category = req.query.category
     try {
          const data = await Model.find({category: category})
          res.status(200).json(data)
     }
     catch(error) {
          res.status(500).json({message: error.message})
     }
}

module.exports = { userController }