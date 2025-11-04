const { Schema, model, default: mongoose } = require("mongoose")

const reflectionSchema = new Schema( {
date: { type: Date, required: true, default: Date.now }, 
title: { type: String },
text: { type: String, required: true }, 
relatedExercise: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }, 
mood: { type: String, enum: [
    "calm", "tired", "energized", "stressed", "content", "sad", "happy", "restless", "loved", "connected", "angry"
]}
}, 
{ timestamps: true } )

const Reflection = model("Reflection", reflectionSchema);

module.exports = Reflection;