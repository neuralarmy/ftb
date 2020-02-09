const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:3000/mydb', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected
  console.log("Database connected!");
});

require('./src/modules/Feature/route.js')(app);
require('./src/modules/Project/route.js')(app);
require('./src/modules/User/route.js')(app);

app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
