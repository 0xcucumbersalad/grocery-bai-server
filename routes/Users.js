require("dotenv").config()
const jwt = require("jsonwebtoken")
const { User, validate } = require('../models/user')
const mongoose = require("mongoose")
const { validatePassword, validateLogin } = require("../utils/fieldValidation.js")

const authenticateToken = require("../middleware/authenticateToken")
const express = require("express")


const app = express()
const router = express.Router()
app.use(express.json())


const mongoString = process.env.URI
mongoose.connect(mongoString)

router.get("/user/me", authenticateToken, async (req, res) => {
     try {

          const response = await User.findOne({_id: req.user.id}, {password: 0, "__v": 0})

          res.status(200).json(response)
     } catch (error) {
          res.status(500).json({message: error.message})
     }
})

router.post("/user/create", async (req, res) => {
     try {
          const email = req.body.email

          const { error } = validate(req.body)
          if (error) return res.status(400).send(error.details[0].message)

          const user = await User.findOne({email: email})
          if (user) return res.status(409).json({message: "Email already exists"})

          const register = await User.create({...req.body})
          res.status(201).json({error: false, message: "Account Created Successfully"})

     } catch (error) {
          res.status(500).json({message: error.message})
     }
})

router.post("/user/login", async (req,res) => {
     try {

          const { error } = validateLogin(req.body)
          if (error) return res.status(400).send({"message": `${error.details[0].message} is required`})

          const user = await User.findOne({ email: req.body.email })
          if (!user) return res.status(400).json({"error": true, message: "Invalid Email Or Password"})

          if (user.password != req.body.password) return res.status(400).json({"error": true, message: "Invalid Email Or Password"})

          const token = jwt.sign({id : user._id}, process.env.ACCESS_TOKEN_SECRET)
          res.status(200).json({"token": token})

     } catch (error) {
          res.status(500).json({message: error.message})
     }
})

router.put("/user/update", authenticateToken, async (req, res) => {
     try {

          const { error } = validatePassword(req.body)
          if (error) return res.status(400).json({message: "Password is required"})

          const user = await User.findOne( { _id: req.user.id} )
          if (user.password == req.body.password) return res.status(400).json({message: "Old password should not be the same as the new one."})

          const update = await user.updateOne({ "$set": {password: req.body.password}})
          if (update) return res.status(200).json({message: "Password successfully updated"})

     } catch (error) {
          res.status(500).json({message: error.message})
     }
})

router.delete("/user/delete", authenticateToken ,async (req, res) => {
     try {
          const user = await User.deleteOne({ _id: req.user.id})
          res.status(200).json({user})
     } catch (error) {
          res.status(500).json({message: error.message})
     }
})

module.exports = router;