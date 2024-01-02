const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get all the notes using: GET "/api/notes/createuser"  . No Login Required
router.get('/fetchallnotes', fetchUser, async function (req, res) {

    try {
        const notes = await Notes.find({ user: req.user.id }).sort({date: -1});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});


// ROUTE 2: Add a new note using: POST "/api/notes/addnote"  . No Login Required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),
], async function (req, res) {

    try {

        const { title, description, tag } = req.body;
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const notes = new Notes({
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        });
        const savedNote = await notes.save();
        res.json({ message: "note added successfully", msgType: "success", savedNote});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote"  . Login Required id= notes id
router.put('/updatenote/:id', fetchUser, async function (req, res) {

    const { title, description, tag } = req.body;
    try {
        let newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        // Allow updation only if the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ message: "Note updated successfully", msgType: "success", note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }

});

// ROUTE 3: Delete an existing note using: POST "/api/notes/deletenote"  . Login Required  id = Notes id
router.delete('/deletenote/:id', fetchUser, async function (req, res) {

    try {

        // find the note to be deleted
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        // Allow deletion only if the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ message: "note deleted successfully", msgType: "success", note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }

});


module.exports = router;