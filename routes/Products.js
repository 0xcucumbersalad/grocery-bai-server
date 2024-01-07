const express = require("express")
const app = express()
const router = express.Router()

const { getCategory, searchProduct}  = require("../controllers/productController")



router.get("/category", getCategory) 

router.get("/search", searchProduct)



module.exports = router;