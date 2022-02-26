// dependancy
const express = require('express');

// variables
const PORT = process.env.PORT || 3001;
const app = express();

const path = require('path');
const fs = require('fs');
const { notes } = require('./db/db');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes);
    res.json(note);
});


function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;

}

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes'));
});             

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index'));
});


// listen for port call 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
