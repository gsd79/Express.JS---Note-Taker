const path = require('path');
const router = require('express').Router();
const { notes } = require('../../db/db');

router.get('/api/notes', (req, res) => {
    res.json(notes);
});

router.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes);
    res.json(note);
});


function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;

}

module.exports = router;
