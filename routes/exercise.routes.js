const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Exercise = require("../models/Exercise.model");

//GET all exercises /
router.get("/", (req, res) => {
    Exercise.find({})
        .then(allExercises => {
            console.log("all Exercises", allExercises)
            res.status(200).json(allExercises)
        }).catch(error => {
            console.error("error", error)
            res.status(500).json({ message: "Error getting all exercises", error })
        })
});

//GET one exercise /:id
router.get("/:id", (req, res) => {
    Exercise.findById(req.params.id)
        .populate("relReflections")
        .then(exercise => {
            console.log("found exercise", exercise)
            res.status(200).json(exercise)
        }).catch(error => {
            console.error("error", error)
            res.status(500).json({ message: "Error getting exercise", error })
        })
});

//POST one exercise /
router.post("/", (req, res) => {
    Exercise.create(req.body)
        .then(newExercise => {
            console.log("new exercise", newExercise)
            res.status(200).json(newExercise)
        }).catch(error => {
            console.error("error", error)
            res.status(500).json({ message: "Error creating exercise", error })
        })
});

//PUT one exercise /:id
router.put("/:id", (req, res) => {
    Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedExercise => {
            console.log("updated exercise", updatedExercise)
            res.status(200).json(updatedExercise)
        }).catch(error => {
            console.error("error", error)
            res.status(500).json({ message: "Error updating exercise", error })
        })
});

//DELETE one exercise /:id
router.delete("/:id", (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(result => {
            console.log("deleted exercise")
            res.status(200).send()
        }).catch(error => {
            console.error("error", error)
            res.status(500).json({ message: "Error deleting exercise", error })
        })
});

module.exports = router

