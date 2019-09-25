var express = require('express');
const router = express.Router();
const Movie=require('../models/Movie');
//--API
router.get('/',(req, res, next)=>{
  const promise = Movie.aggregate([
    {
        $lookup:{
          from:'directors',
          localField: 'directory_id',
          foreignField: '_id',
          as: 'director'
        }
    },
      {
      $unwind:
        {
          path: '$director',
          preserveNullAndEmptyArrays:true
        }
      }
  ]);
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

//get Top10 lists
router.get('/top10',(req, res, next)=>{
  const promise = Movie.find({}).limit(10).sort({imdb_score:-1});
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

router.get('/:movie_id',(req, res, next)=>{
  const promise=Movie.findById(req.params.movie_id);
  promise.then((movie)=>{
    if (!movie)
      next({message:"Movie was not found", code:99});
    res.json(movie);

  }).catch((err)=>{
    res.json(err)
  });
});
//Gücelleme İşlemi Yapılması
router.put('/:movie_id',(req, res, next)=>{
  const promise=Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    {
      new:true
    }
  );
  promise.then((movie)=>{
    if (!movie)
      next({message:"Movie was not found", code:99});
    res.json({status:1});

  }).catch((err)=>{
    res.json(err)
  });
});

//Delete İşlemi Yapılması
router.delete('/:movie_id',(req, res, next)=>{
  const promise=Movie.findByIdAndRemove(req.params.movie_id);
  promise.then((movie)=>{
    if (!movie)
      next({message:"Movie was not found", code:99});
    res.json({status:1});

  }).catch((err)=>{
    res.json(err)
  });
});

//Between
router.get('/between/:start_year/:end_year',(req, res, next)=>{
  const{start_year, end_year}=req.params
  const promise = Movie.find(
    {
      year:{"$gte":parseInt(start_year),"$lte":parseInt(end_year)}
    }
  );
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

//--END AIP


router.post('/', function(req, res, next) {

  /*
  const {title,category, country, year, imdb_score}=req.body;
  const movie=new Movie({
    title:title,
    category:category,
    country:country,
    year:year,
    imdb_score:imdb_score
  });
*/
  //İkinci Yöntem
  const movie=new Movie(req.body);
  //

  /*
  movie.save(function (err, data) {
    if (err) return console.error(err);
    res.json(data)
  });
  */

  //Promise Yapısı İle Kullanımı
  const promise = movie.save();

  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });


});

module.exports = router;
