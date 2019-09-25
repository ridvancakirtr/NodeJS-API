var express = require('express');
var router = express.Router();
const Director=require('../models/Director')

/* Director Ekleme. */
router.post('/', function(req, res, next) {
  const director=new Director(req.body);
  const promise = director.save();
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
});

/* get director. */
router.get('/',(req, res, next)=>{
  const promise = Director.aggregate(
    [
      {
      $lookup:{
        from: 'movies',
        localField: '_id',
        foreignField: 'directory_id',
        as: 'movies'
      }
    },
      {
      $unwind:
        {
          path: '$movies',
          preserveNullAndEmptyArrays:true
        }
      },
      {
        $group:{
        _id:{
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies:{
          $push:'$movies'
        }
      }
    },{
      $project:{
        _id:'$_id._id',
        name:'$_id.name',
        surname:'$_id.surname',
        movies:'$movies'
      }
    }
  ]);
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});


/* director Listeleme */
router.get('/:director_id',(req, res, next)=>{
  const promise = Director.aggregate(
    [
      {
        '_id':req.params.director_id
      },
      {
      $lookup:{
        from: 'movies',
        localField: '_id',
        foreignField: 'directory_id',
        as: 'movies'
      }
    },
      {
      $unwind:
        {
          path: '$movies',
          preserveNullAndEmptyArrays:true
        }
      },
      {
        $group:{
        _id:{
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies:{
          $push:'$movies'
        }
      }
    },{
      $project:{
        _id:'$_id._id',
        name:'$_id.name',
        surname:'$_id.surname',
        movies:'$movies'
      }
    }
  ]);
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  });
});

//Delete İşlemi Yapılması
router.delete('/:director_id',(req, res, next)=>{
  const promise=Director.findByIdAndRemove(req.params.director_id);
  promise.then((movie)=>{
    if (!movie)
      next({message:"Movie was not found", code:99});
    res.json({status:1});

  }).catch((err)=>{
    res.json(err)
  });
});


//Gücelleme İşlemi Yapılması
router.put('/:director',(req, res, next)=>{
  const promise=Director.findByIdAndUpdate(
    req.params.director,
    req.body,
    {
      new:true
    }
  );
  promise.then((director)=>{
    if (!director)
      next({message:"Director was not found", code:99});
    res.json({status:1});

  }).catch((err)=>{
    res.json(err)
  });
});

module.exports = router;
