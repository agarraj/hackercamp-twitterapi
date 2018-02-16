const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

var db = require('./api/routes/dbConn');
var url = 'mongodb://localhost:27017/myDB';
//db connection
db.connect(url, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    //db=client.db('myDB');
    console.log('Connected to MongoDB server...');
    server.listen(port);
    }
});
