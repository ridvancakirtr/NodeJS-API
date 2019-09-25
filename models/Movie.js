const moongose=require('mongoose');
const Schema=moongose.Schema;
const MovieSchema=new Schema({
    directory_id:Schema.Types.ObjectId,
    title:{
      type:String,
      required:[true," '{PATH}' alanı zorunludur."],
      maxlength:15,
      minlength:1
    },
    category:String,
    country:{
      type:String,
      required:[true," '{PATH}' alanı zorunludur."],
      maxlength:15,
      minlength:1
    },
    year:Number,
    imdb_score:Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports=moongose.model('movie',MovieSchema);
