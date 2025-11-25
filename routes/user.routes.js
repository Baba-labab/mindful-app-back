const express = require("express")
const { isAuthenticated } = require("../middleware/jwt.middleware.js")
const router = express.Router();

const User = require("../models/User.model")
const Reflection = require("../models/Reflection.model.js")

//GET user /:id
router.get("/:id", isAuthenticated, (req, res) => {
    User.findById(req.params.id)

        .populate("favExercises")
        .then(user => {
            console.log("user", user)
            res.status(200).json(user)
        })
        .catch(error => {
            console.error("error", error);
            res.status(500).json({ message: "Error getting user", error })
        });
})

//PUT change account data /:id
router.put("/:id", isAuthenticated, (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedUser => {
            console.log("updated User", updatedUser);
            res.status(200).json(updatedUser)
        })
        .catch(error => {
            console.error("error", error);
            res.status(500).json({ message: "Error updating user", error })
        })
})
//DELETE account /:id
router.delete("/:id", isAuthenticated, async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await Reflection.deleteMany({ user: userId });
        console.log(response)
        await User.findByIdAndDelete(userId);
        console.log("User and reflections deleted");

        res.status(200).json({message: "User and reflections deleted"})
        
    } catch(error) { 
        console.error("error", error);
        res.status(500).json({ message: "Error deleting user", error })
    }
})

module.exports = router