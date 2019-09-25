const moongose=require('mongoose');
const Schema=moongose.Schema;
const DirectorSchema=new Schema({
    name:{
      name:String,
      maxlength:60,
      minlength:2
    },
    surname:{
      name:String,
      maxlength:60,
      minlength:2
    },
    bio:{
      name:String,
      maxlength:60,
      minlength:2
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports=moongose.model('director',DirectorSchema);
