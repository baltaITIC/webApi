var express      = require('express'),
  app            = express(),
  logger         = require('morgan'),
  mongoose       = require('mongoose'),
  bodyParser     = require('body-parser'),
  cors           = require('cors'),
  databaseConfig = require('./config/database'),
  router         = require('./routes');

//var connection = mongoose.connect(databaseConfig().url, databaseConfig().options);
mongoose.Promise = global.Promise;
var connection = mongoose.connect('mongodb://localhost:27017/MyMusic');
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

app.listen(process.env.PORT || 8080);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

router(app);
