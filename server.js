// dependancy
const express = require('express');

// variables
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./public/routes/apiRoutes');
const htmlRoutes = require('./public/routes/htmlRoutes');


// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use routes
app.use('/api/notes', apiRoutes);
app.use('/', htmlRoutes);


// listen for port call 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
