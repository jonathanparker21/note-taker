const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

router.get('/', (req, res) => {
  res.json(JSON.parse(fs.readFileSync('./db/db.json', 'utf-8')))
})

router.post('/', (req, res) => {

  const { title, text, id } = req.body

  if (title && text) {
    const newEntry = {
      title,
      text,
      id: uuidv4()
    }

    let notes = JSON.stringify(newEntry)
    fs.readFile('./db/db.json', 'utf-8', (err, notes) => {
      if (err) {
        console.log('There was an error reading the file.' + err)
      }

      let binder = JSON.parse(notes)
      binder.push(newEntry)


      fs.writeFile('./db/db.json', JSON.stringify(binder), (err) => {
        if (err) {
          console.log('There was an error writing to the db.json.' + err)
        } else {
          console.log('New entry successfully written to the db.')
        }

        res.json(binder)

      })

    })
  }
})

module.exports = router;