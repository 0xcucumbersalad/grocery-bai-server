const authenticateToken = require("../middleware/authenticateToken")
const { getUser } = require("../controllers/userController")
const { getWishlist, createWishlist, deleteWishlist, updateWishlist, shareWishlist } = require("../controllers/userWishlist")
const express = require("express")
const app = express()
const router = express.Router()


router.get("/wishlist", authenticateToken, getWishlist)

router.post("/wishlist", authenticateToken, createWishlist )

router.delete("/wishlist", authenticateToken, deleteWishlist)

router.put("/wishlist", authenticateToken, updateWishlist)

router.get("/wishlist/share", authenticateToken, shareWishlist)

module.exports = router;