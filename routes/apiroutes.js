const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const dataBase = require('../db/db.json')
const fs = require('fs');
const { json } = require('express/lib/response');

// route to retrieve notes from the db
router.get('/', (req, res) => {
    res.json(JSON.parse(fs.readFileSync("./db/db.json", "utf8")))
}
);

// POST Route for submitting feedback
router.post('/', (req, res) => {
console.info(`${req.method} request received to add a note`);
  const { id, title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    
    const noteString = JSON.stringify(newNote)

    fs.readFile('../db/db.json', 'utf8', (err, noteString) => {
        if (err) {
            console.log(err)
        } else {
            let notes = JSON.parse(noteString)
            notes.push(newNote)
        }

        fs.writeFile('../db/db.json', JSON.stringify(notes), (err) => {
            console.log(err)
            res.json(notes)
        })
    })

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

module.exports = router;