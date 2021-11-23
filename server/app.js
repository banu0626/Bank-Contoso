var express= require('express')
var app = express();
const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017";
var cors=require('cors')
app.use(cors());


app.use(express.urlencoded({ extended: true }))
app.use(express.json());


 app.get("/",function(req,res){
     res.send("i am working")
 })
 app.get("/getlast",function(req,res){
   MongoClient.connect(url,function(err,conn){
       var db = conn.db("delta");
       db.collection("applications").findOne(
    {},
    { sort: { _id: -1 } },
    (err, data) => {
    //    console.log(data.loannumber.slice(-3));
       res.send(data)
       
    },)
   })})
//Delete loan
 app.get("/loandelete/:id",function(req,res){
    MongoClient.connect(url,function(err,conn){
     var db = conn.db("delta");
     db.collection('applications').deleteOne({_id:ObjectId(req.params.id)})
        res.send("Done")
           })
     })

// adding New Loan
 app.post('/newloan',(req,res) => {
    MongoClient.connect(url,function(err,conn){
    // var value=setloannumber();
    var db = conn.db("delta");
    db.collection('applications').insertOne({
     serialno:req.body.serialno,
    //  serialno:100,
     details:req.body
 },(err,data)=>{
     res.send(data)
     console.log(data)
})
})
})

//Getting all Loan List
 app.get("/alllist",function(req,res){
 MongoClient.connect(url,function(err,con){  
     var db =con.db("delta"); 
     db.collection("applications").find()
    .toArray(function(err,data){   
  res.send(data);   
  })   
     })   
 })    


//Adding BAnk Branches
 app.post('/addbranch',(req,res) => {
     MongoClient.connect(url,function(err,conn){
  var db = conn.db("delta");
  db.collection('bankbranch').insertOne(req.body,function(data){
      res.send(data)
  })
 })
 })
 
//List Branches
app.get("/getbranch",function(req,res){
    MongoClient.connect(url,function(err,con){
    var db =con.db("delta");
    db.collection("bankbranch").find()
     .toArray(function(err,data){
      res.send(data);
     })
 })
    })


 app.listen(9999,function(){
     console.log("listening in 9999")
 })