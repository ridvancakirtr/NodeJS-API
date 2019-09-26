const moongose=require('mongoose');
const Schema=moongose.Schema;
const DirectorSchema=new Schema({
    name:{
      type:'string',
      maxlength:60,
      minlength:2
    },
    surname:{
      type:'string',
      maxlength:60,
      minlength:2
    },
    bio:{
      type:'string',
      maxlength:60,
      minlength:2
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports=moongose.model('director',DirectorSchema);
