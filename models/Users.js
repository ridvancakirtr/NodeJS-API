const moongose=require('mongoose');
const Schema=moongose.Schema;

const UserSchema=new Schema({
  username:{
    type:'string',
    maxlength:60,
    minlength:2
  },
  password:{
    type:'string',
    minlength:2
  }
});
//'user' veri tabanına yazılacak isim
module.exports=moongose.model('user',UserSchema);
