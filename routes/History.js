
const authenticateToken = require("../middleware/authenticateToken")
const express = require("express")
const { ObjectId } = require("mongodb")
const app = express()
const router = express.Router()

const { getItems, postItem, updateItem, deleteItem } = require("../controllers/historyController")


router.get("/user/deleted_items", authenticateToken, getItems)

router.post("/user/deleted_items", authenticateToken, postItem)

router.put("/user/deleted_items", authenticateToken, updateItem)

router.delete("/user/deleted_items", authenticateToken, deleteItem)


module.exports = router;