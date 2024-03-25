const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // reference to the User model in our database
        index: true,  // for faster queries on this field
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Note = mongoose.model("Note", notesSchema);

module.exports = Note;