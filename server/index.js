const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser')
const recipeRouter = require('./routes/recipeRouter') 

app.use(bodyParser.json())
app.use(express.static(__dirname + '/../dist'))

app.use('/recipe', recipeRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})