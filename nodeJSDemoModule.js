var http = require('http');
var dt = require('./nodeJSDateTime.js');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time is currently: " + dt.myDateTime());
  res.end();
}).listen(3000);

exports.myDateTime = function () {
    return Date();
  };