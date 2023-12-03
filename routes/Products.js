require("dotenv").config()
const Model = require('../models/product')
const mongoose = require("mongoose")
const express = require("express")

const { userController } = require("../controllers/authController")

const app = express()
const router = express.Router()
app.use(express.json())

const mongoString = process.env.URI
mongoose.connect(mongoString)

router.get("/category", async (req, res ) => {
     const category = req.query.category
     try {
          const data = await Model.find({category: category})
          res.status(200).json(data)
     }
     catch(error) {
          res.status(500).json({message: error.message})
     }
}) 

router.get("/test", userController)

router.get("/search", async (req, res) => {
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
})


module.exports = router;