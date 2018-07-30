var Artist = require('../models/artist');

exports.getTodos = (req, res, next) => {

    Artist.find({}, (err, Artists) => {

      if(err){
          return res.send(err);
      }

      return res.status(200).json(Artists);
  });

}

exports.getArtist = (req, res, next) => {

    let artist_Id =  req.params.id_artist;

    Artist.findOne({_id:artist_Id}, (err, Artists) => {
        if(err){
            return res.send(err);
          }

          return res.status(200).json(Artists);
    });

}

exports.updateArtist = (req, res, next) => {

    let artist_id =  req.params.id_artist;

    Artist.findByIdAndUpdate(artist_id, req.body, {new: true}, (err, Artists) =>{
        if(err)
            res.send(err);
        res.json(Artists);
    });

}

exports.createArtist = (req, res, next) => {

    let name = req.body.name;

    if(!name){
        return res.status(400).send({error: 'You must enter a name'});
    }

    var newArtist = new Artist(
     req.body
    );

    newArtist.save(function(err, Artist){

        if(err){
          return next(err);
        }

        res.status(201).json({
            Artist: Artist
        });

      });

}

exports.deleteArtist = (req, res, next) => {

    var id_artist =  req.params.id_artist;
    Artist.findByIdAndRemove(id_artist , (err, Artists) => {
        if(err)
            res.send(err);
        res.json(Artists);
    });
    

}
