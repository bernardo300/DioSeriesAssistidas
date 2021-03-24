const express = require('express'),
server = express(),
cors = require('cors');

const bodyParser = require('body-parser');

server.use(require("cors")());
server.use(bodyParser.urlencoded({ extended: true })); 
server.use(bodyParser.json());
    
    
require('./routes/routes.js')(server);

server.listen(5000, () => {
    console.log('http://localhost:5000')
})
