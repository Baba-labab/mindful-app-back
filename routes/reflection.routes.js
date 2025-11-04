const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js")

const Reflection = require("../models/Reflection.model.js")

//GET all reflections 
router.get("/", (req, res, next) => {
    Reflection.find({}) 
    .then(allReflections => {
         res.status(200).json(allReflections);
    })
    .catch((error) => {
        res.status(500).json( { message: "Failed to get all Reflections", error})
    });
});

//GET one reflection /:id
router.get("/:id", isAuthenticated, (req, res) => {
    Reflection.findById(req.params.id)
        .then(reflection => {
            console.log("found reflection", reflection)
            res.status(200).json(reflection)
        }).catch(error => {
            console.error("error", error)
            res.status(500).json({ message: "Error getting reflection", error })
        })
});

//POST one reflection /
router.post("/", isAuthenticated, (req, res) => {
    Reflection.create(req.body)
        .then(newReflection => {
            console.log("new reflection", newReflection)
            res.status(200).json(newReflection)
        }).catch(error => {
            console.error("error", error)
            res.status(500).json({ message: "Error creating reflection", error })
        })
});

//PUT one Reflection /:id
router.put("/:id", isAuthenticated, (req, res) => {
    Reflection.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedReflection => {
            console.log("updated reflection", updatedReflection)
            res.status(200).json(updatedReflection)
        }).catch(error => {
            console.error("error", error)
            res.status(500).json({ message: "Error updating reflection", error })
        })
});

//DELETE one Reflection /:id
router.get("/:id", isAuthenticated, (req, res) => {
    Reflection.findByIdAndDelete(req.params.id)
        .then(result => {
            console.log("deleted reflection")
            res.status(200).send()
        }).catch(error => {
            console.error("error", error)
            res.status(500).json({ message: "Error deleting reflection", error })
        })
});

module.exports = router;
