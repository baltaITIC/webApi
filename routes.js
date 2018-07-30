var TodoController            = require('./controllers/todos'),
    AuthController            = require('./controllers/auth'),
    myMusicController         = require('./controllers/myMusic');
    express                   = require('express'),
    passport                  = require('passport'),
    multer                    = require('multer');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = (app) => {

    var apiRoutes     = express.Router(),
        authRoutes    = express.Router(),
        todoRoutes    = express.Router();
        musicRoutes   = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/register', AuthController.register);

    // Todo Routes
   apiRoutes.use('/todos', todoRoutes);
    todoRoutes.get('/:todo_id', TodoController.getTodo);
    todoRoutes.get('/', TodoController.getTodos);
    todoRoutes.post('/', TodoController.createTodo);
    todoRoutes.put('/:todo_id', TodoController.updateTodo);
    todoRoutes.delete('/:todo_id', TodoController.deleteTodo);

    //artist routes
    musicRoutes.use('/mymusic/artist', musicRoutes);
    musicRoutes.get('/', myMusicController.getTodos);
    musicRoutes.post('/', myMusicController.createArtist);
    musicRoutes.get('/:id_artist', myMusicController.getArtist);
    musicRoutes.put('/:id_artist', myMusicController.updateArtist);
    musicRoutes.delete('/:id_artist', myMusicController.deleteArtist);

    // Set up routes
    //app.use('/api/v1', apiRoutes);
    app.use('/api/v1', musicRoutes);

    apiRoutes.use((req, res, next) => {
      res.status(404).send("Not found");
    });

    apiRoutes.get('/', (req, res) => {
      res.status(200).send('Basic Api V1');
    })

}
