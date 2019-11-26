const User=require('../../database/schema/user');
const express=require('express');
const router=express.Router();
const empty=require('is-empty');
const sha1=require('sha1');
const jwt=require('jsonwebtoken');
const auth=require('./ver');

router.get('/',auth,(req,res)=>{
    User.find({},(err,docs)=>{
      if(empty(docs)){
        res.json({message:'no existen usuarios en la bd'});
      }else{
        res.json(docs);
      }
    });
});

router.post('/',async(req,res)=>{
    console.log(req.body);
    req.body.password=(sha1(req.body.password));
    let ins=new User(req.body);
    let result=await ins.save();
    res.json({message:'usuario insertado'});
});

router.post('/login',(req,res)=>{
    console.log(req.body);
    User.findOne({email:req.body.email},(err,doc)=>{
      if(!empty(doc)){
        if(doc.password==(sha1(req.body.password))){
            const token=jwt.sign({
              email:doc.email
            },process.env.JWT_KEY||'tokenclave',{
              expiresIn:'2h'
            });
            res.json({
              message:'autenticacion exitosa',
              token:token
            });
        }else {
          res.json({message:'el password es incorrecto'});
        }
      }else{
        res.json({message:'el email es incorrecto'});
      }
    });
});
module.exports=router;
