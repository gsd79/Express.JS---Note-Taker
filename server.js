const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;
const apiRoutes = require('../../routes/apiRoutes');
const htmlRoutes = require('../../routes/apiRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use apiRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

const { notes } = require('./develop/db');
app.get('/api/notes', (req, res) => {
      res.json(notes);
  });

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
