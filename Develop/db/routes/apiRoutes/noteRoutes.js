const router = require('express').Router();
const { renderActiveNote,
    handleNoteSave,
    handleNoteDelete,
    handleNewNoteView,
    handleRenderSaveBtn,
    renderNoteList,
    createLi,
    getAndRenderNotes } = require('.public/assets/js/index');
const { notes } = require('./develop/db/db.json');

router.get('/api/notes', (req, res) => {
    res.json(notes);
});

router.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createLi(req.body, notes);
    res.json(note);
});

module.exports = router();