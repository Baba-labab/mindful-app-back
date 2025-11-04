const express = require("express")
const { isAuthenticated } = require("../middleware/jwt.middleware.js")
const router = express.Router();

const User = require("../models/User.model")

//GET user /:id
router.get("/:id", isAuthenticated, (req, res) => {
    User.findById(req.params.id)
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
        res.status(500).json( {message: "Error updating user", error })
    })
})
//DELETE account /:id
router.delete("/:id", isAuthenticated, (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(result => {
       console.log("User deleted");
        res.status(204).send();
    })
    .catch(error => {
        console.error("error", error);
        res.status(500).json( {message: "Error deleting user", error })
    })
})

module.exports = router