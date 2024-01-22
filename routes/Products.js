const express = require("express")
const app = express()
const router = express.Router()

const { getCategory, searchProduct, getCategory1}  = require("../controllers/productController")



router.get("/category", getCategory) 
router.get("/category1", getCategory1)

router.get("/search", searchProduct)



module.exports = router;