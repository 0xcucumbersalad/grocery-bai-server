const express = require("express")
const app = express()
const router = express.Router()
const authenticateToken = require("../middleware/authenticateToken")



const { getCategory, searchProduct, createProduct } = require("../controllers/favoriteController.js")

router.get("/favorite_category",authenticateToken, getCategory) 

router.get("/favorite_search", authenticateToken, searchProduct)

router.post("/add_favorite", authenticateToken, createProduct)



module.exports = router;