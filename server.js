const express = require('express');
const apiRoutes = require('./routes/apiroutes')
const htmlRoutes = require('./routes/htmlroutes')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api/notes', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
