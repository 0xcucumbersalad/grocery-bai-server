require("dotenv").config()
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const { validateWishList, validateDeleteWishlist, validateUpdateWishlist } = require("../utils/fieldValidation")
const Wishlist = require("../models/wishlist")
const Link = require("../models/link")

const crypto = require("node:crypto")

const express = require("express")
const app = express()
const router = express.Router()
app.use(express.json())

const mongoString = process.env.URI
mongoose.connect(mongoString)


const getWishlist = async (req, res) => {
     try {
          if (req.query.id != req.user.id) return res.status(403).json({message: "Error, Please Try Again"}) 
          const wishlist  = await Wishlist.find({userId: req.query.id}, {__v: 0})
          res.status(200).json({message: wishlist})
     } catch (error) {
          res.status(500).json({message: error.message})
     }
}

const createWishlist = async (req, res) => {
     try {
          const { error } = validateWishList(req.body)
          if (error) return res.status(400).json({message: error.details[0].message})
          if (req.body.userId != req.user.id) return res.status(403).json({message: "Error, Please Try Again"}) 

          const wishlist = await Wishlist.create(req.body)

          if (wishlist) return res.status(200).json({message: "New wishlist has been added"})
          
     } catch (error) {
          res.status(500).json({message: error.message})
     }
}

const deleteWishlist = async (req, res) => {
     try {
          const { error } = validateDeleteWishlist(req.body)
          if (error) return res.status(400).json({message: error.details[0].message})
          if (req.body.userId != req.user.id) return res.status(403).json({message: "Error, Please Try Again"}) 

          const wishlist = await Wishlist.findOne({_id: req.body.id})
          if (!wishlist) return res.status(404).json({mesage: "list doesn't exist"})

          const deleteList = await Wishlist.deleteOne({_id: req.body.id})

          res.status(200).json({message: "Wishlist has been deleted"})


     } catch (error) {
          res.status(500).json({message: error.message})
     }
}

const updateWishlist = async (req, res) => {
     try {
          const id = new mongoose.Types.ObjectId(req.body.id)
          const { error } = validateUpdateWishlist(req.body)
          if (error) return res.status(400).json({message: error.details[0].message})
          if (req.body.userId != req.user.id) return res.status(403).json({message: "Error, Please Try Again"}) 

          const wishlist = await Wishlist.findOne({_id: req.body.id})
          if (!wishlist) return res.status(404).json({message: "list doesn't exist"})

          //console.log(wishlist)
          const updateList = await Wishlist.updateOne({_id: id, userId: req.body.userId}, { "$set": {list: req.body.list}})


          res.status(200).json({message: "Wishlist has been updated"})

     } catch (error) {
          res.status(500).json({message: error.message})
     }
}

const shareWishlist = async (req, res) => {
     try {
          const id = new mongoose.Types.ObjectId(req.query.id)
          if (req.query.id == null) return res.status(403).json({message : "wishlist_id is required"})
          const wishlist = await Wishlist.findOne({_id: id})
          if (!wishlist) return res.status(404).json({message: "list doesn't exist"})

          const link = crypto.randomBytes(20).toString('hex')

          const saveLink = await Link.create({wishlist_id: id, randomized: link})
          
          return res.status(200).json({link: `${process.env.APP_URI}?wish/${link}`})
     } catch (error) {
          res.status(500).json({message: error.message})
     }
}

module.exports = { getWishlist, createWishlist, deleteWishlist, updateWishlist, shareWishlist }