const { Schema, model, default: mongoose } = require("mongoose")

const exerciseSchema = new Schema({
    title: { type: String, required: true, unique: true },
    category: { type: String, required: true, enum: [ "calm", "energize", "ground", "connect", "nourish", "rest"] },
    tags: [ { type: String, required: true, 
        enum: [ "move", "breathe", "meditate", "stretch", "walk", "dance", "eat", "drink", "sleep", "meet", "watch", "listen", "reflect", "journal", "nature"] } ],
    description: { type: String, required: true }, 
    mediaUrl: { type: String },
    duration: { type: Number },
    relReflections: { type: [ mongoose.Schema.Types.ObjectId ], ref: "Reflection"} 
}, 
{ timestamps: true });

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;