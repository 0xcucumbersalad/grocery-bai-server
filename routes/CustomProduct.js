const express = require("express")
const app = express()
const router = express.Router()
const authenticateToken = require("../middleware/authenticateToken")



const { getCategory, searchProduct, createProduct } = require("../controllers/customController.js")

router.get("/custom_category", getCategory) 

router.get("/custom_search", searchProduct)

router.post("/create", createProduct, authenticateToken)



module.exports = router;