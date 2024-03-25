const express = require("express");
const router = express.Router();
const Note = require('../models/noteModel')
const { validationResult, body } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1: Fetch all notes using: GET "api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.userId });
        res.send(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured");
    }
});

// ROUTE 2: Create new Note using: POST "api/notes/addnote". login required
router.post("/addnote", fetchuser, [// validator
    body('title', 'Title must be of atleast 2 characters').isLength({ min: 3 }),
    body('content', 'Content must be of atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });

    }
    let success = false;
    const { title, content, tag } = req.body;
    try {

        const note = new Note({
            title, content, tag, user: req.userId,
        });

        const savedNote = await note.save();
        success = true;
        res.json({ success, savedNote });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured");
    }
});

// ROUTE 3: Update Note using: PUT "api/notes/updatenote". login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, content, tag } = req.body;
    // Create newNote object
    const newNote = {};
    if (title) newNote.title = title;
    if (content) newNote.content = content;
    if (tag) newNote.tag = tag;

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("File Not Foundjhdg");

    if (note.user.toString() !== req.userId) return res.status(401).send("Not Allowed");

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    // Object.assign(note,newNote); update existing fields with values from request payload

    res.json(note);
});

// ROUTE 3: Delete Note using: DELETE "api/notes/deletenote". login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    const { title, content, tag } = req.body;

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("File Not Foundjhdg");

    // Allow deletion only if user owns this note
    if (note.user.toString() !== req.userId) return res.status(401).send("Not Allowed");

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ "Success": "Note has been deleted", note });
});

module.exports = router;