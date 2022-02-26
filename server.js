// dependancy
const express = require('express');
const path = require('path');
const fs = require('fs');
const {notes} = require('./db/db.json');

// variables
const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


//api routes
app.get('/api/notes', (req,res) => {
      fs.readFile('./db/db.json', 'utf8' , (err, notes) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(notes)
      })
    res.json(notes)
})

app.post('/api/notes', (req,res) => {
    req.body.id = notes.length.toString();
    const note = req.body;
    notes.push(note);
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes }, null, 2))

    res.json(note);
})

app.delete('/api/notes/:id', (req,res) => {
    const { id } = req.params
    const deletedNote = notes.find(notes => notes.id === id)

    if(deletedNote !== id ) {
        notes.splice(id);
        
        console.log('Note #' +id + '  has been deleted')
        fs.writeFileSync(path.join(__dirname, './db/db.json'),
            JSON.stringify({ notes }, null, 2))
    }
})

// html routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
  
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  


// listen for port call 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
