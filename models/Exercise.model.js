const { Schema, model, default: mongoose } = require("mongoose")

const exerciseSchema = new Schema({
    title: { type: String, required: true, unique: true },
    category: { type: String, required: true, enum: [ "balance", "energy", "expression", "connection", "nourishment", "rest"] },
    description: { type: String, required: true },
    tags: [ { type: String, required: true, 
        enum: [ "move", "breathe", "meditate", "stretch", "walk", "dance", "eat", "drink", "sleep", "connect", "watch", "listen", "reflect", "journal", "nature", "create", "play","calm down", "ground", "feel", "observe", "visualize"] } ],
    mediaUrl: { type: String },
    mediaType: { type: String, enum: ["audio", "video"] },
    imgUrl: { type: String },
    categoryImg: {type:String },
    duration: { type: String },
    timeLevel: { type: Number, enum: [ 1,2,3,4,5,6 ] },
    relReflections: { type: [ mongoose.Schema.Types.ObjectId ], ref: "Reflection"} 
}, 
{ timestamps: true });

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;