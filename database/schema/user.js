const mongoose=require('../connect');

const user={
  nombre:String,
  email:String,
  password:String,
  admin:Boolean
};

const usermodel=mongoose.model('user',user);

module.exports=usermodel;
