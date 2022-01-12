const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

// route to send user input to notes.html
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// route to send user to index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  });

module.exports = router;
