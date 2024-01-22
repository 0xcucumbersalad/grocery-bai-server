require("dotenv").config()
const jwt = require("jsonwebtoken")
const { User, validate } = require('../models/user')
const { Reset } = require('../models/reset.js')
const mongoose = require("mongoose")
const { validatePassword, validateLogin } = require("../utils/fieldValidation.js")

const authenticateToken = require("../middleware/authenticateToken")
const express = require("express")

const { OTP } = require('../utils/email')


const app = express()
const router = express.Router()
app.use(express.json())


const mongoString = process.env.URI
mongoose.connect(mongoString)

const getUser =  async (req, res) => {
     try {

          const response = await User.findOne({_id: req.user.id}, {password: 0, "__v": 0})

          res.status(200).json(response)
     } catch (error) {
          res.status(500).json({message: error.message})
     }
}

const registerUser = async (req, res) => {
     const random = Math.floor(Math.random() * 9213213) + 1;
     let image_url = `https://api.dicebear.com/7.x/big-ears-neutral/svg?seed=${random}`
     try {
          const email = req.body.email

          const { error } = validate(req.body)
          if (error) return res.status(400).send(error.details[0].message)

          const user = await User.findOne({email: email})
          if (user) return res.status(409).json({error: true, message: "Email already exists"})


          const register = await User.create({...req.body, image: image_url})
          res.status(201).json({error: false, message: "Account Created Successfully"})

     } catch (error) {
          res.status(500).json({message: error.message})
     }
}

const loginUser = async (req, res) => {
     try {

          const { error } = validateLogin(req.body)
          if (error) return res.status(400).send({"message": `${error.details[0].message} is required`})

          const user = await User.findOne({ email: req.body.email })
          if (!user) return res.status(400).json({error: true, message: "Invalid Email Or Password"})

          if (user.password != req.body.password) return res.status(400).json({"error": true, message: "Invalid Email Or Password"})

          const token = jwt.sign({id : user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1hr'})
          res.status(200).json({"token": token, "id": user._id})

     } catch (error) {
          res.status(500).json({message: error.message})
     }
}


const updateUser = async (req, res) => {
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
}


const updateProfile = async (req, res) => {
     try {

          const user = await User.findOne( { _id: req.body.id} )
          
          const update = await user.updateOne({ "$set": {...req.body}})
          if (update) return res.status(200).json({message: "User Account successfully updated"})

     } catch (error) {
          res.status(500).json({message: error.message})
     }
}

const sendOTP = async (req, res) => {
     try {
          const email = req.body.email

          const user = await User.findOne({email: email})

          if (user == null) return res.status(200).json({error: true, message: 'user not found'})

          const otp = Math.floor(100000 + Math.random() * 900000)

          const otpCheck = await Reset.findOne({email: email})

          if (otpCheck) {
               const deleteOtp = await Reset.deleteOne({email: email})
          }

          const createOtp = await Reset.create({email: email, otp: otp})

          const send = await OTP(email, otp)

          res.status(200).json({error: false, message: '6 Digit code has been sent to your email'})

     } catch (error) {
          res.status(500).json({message: error.message})
     }
}


const resetPassword = async (req, res) => {
     try {
          const email = req.body.email

          const user = await User.findOne({email: email})
          const otp = await Reset.findOne({email: email})

          if (!user) return res.status(404).json({error: true, message: "User does not exist"})
          if (req.body.otp != otp.otp) return res.status(403).json({error: true, message: "You have provided an invalid OTP"})

          const reset = await user.updateOne({ "$set": {password: req.body.password}})

          const del = await Reset.deleteMany({email: email})

          res.status(200).json({error: false, message: "Successfully reset your password."})

     } catch (error) {
          res.status(500).json({message: error.message})
     }
}

const deleteUser = async (req, res) => {
     try {
          const user = await User.deleteOne({ _id: req.user.id})
          res.status(200).json({user})
     } catch (error) {
          res.status(500).json({message: error.message})
     }
}

module.exports = { getUser, registerUser, loginUser, registerUser, updateUser, deleteUser, sendOTP, resetPassword, updateProfile }