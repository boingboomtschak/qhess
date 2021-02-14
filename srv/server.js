var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, '../cln/build')));

var server = app.listen(8080);