
const authenticateToken = require("../middleware/authenticateToken")
const express = require("express")
const { ObjectId } = require("mongodb")
const app = express()
const router = express.Router()

const { getItems, postItem, updateItem, deleteItem } = require("../controllers/itemController")


router.get("/user/items", authenticateToken, getItems)

router.post("/user/items", authenticateToken, postItem)

router.put("/user/items", authenticateToken, updateItem)

router.delete("/user/items", authenticateToken, deleteItem)


module.exports = router;