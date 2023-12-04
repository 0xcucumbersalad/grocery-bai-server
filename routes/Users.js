
const authenticateToken = require("../middleware/authenticateToken")
const { getUser, registerUser, loginUser, updateUser, deleteUser } = require("../controllers/userController")
const express = require("express")
const app = express()
const router = express.Router()


router.get("/user/me", authenticateToken, getUser)

router.post("/user/create", registerUser)

router.post("/user/login", loginUser)

router.put("/user/update", authenticateToken,  updateUser)

router.delete("/user/delete", authenticateToken, deleteUser)

module.exports = router;