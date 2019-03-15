const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
// Connection URL
const url = 'mongodb+srv://admin:admin>@cluster0-vbdhc.mongodb.net/test?retryWrites=true';

// Database Name
const dbName = 'Tasks';

function connect(callback){
    MongoClient.connect("mongodb+srv://admin:admin@cluster0-vbdhc.mongodb.net/test?retryWrites=true", { 
        
    useNewUrlParser: true },function(err, client) {
      assert.equal(null, err);
      //console.log("Connected successfully to server");
      if(err)
      {
          callback(err,null)

      }
      else{  callback(null,client)}
 
    });
}

function findemployee(callback){
connect((err,client)=>{const db = client.db(dbName);
    const collection = db.collection('task');
   
   
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      client.close();
     callback(null,docs);
    });
   })
   
}


function findtaskspecific(id,callback){
    console.log(id)
    
    connect((err,client)=>{const db = client.db(dbName);
        const collection = db.collection('task');
       
       
        // Find some documents
        collection.find({"_id": new ObjectId(id)}).toArray(function(err, docs) {
          assert.equal(err, null);
          console.log("Found the following records");
          client.close();
         callback(null,docs);
        });
       })
       
    }



function insertparent(color,callback){
    
    connect((err,client)=>{
        const db = client.db(dbName);
        const collection = db.collection('parenttask');
         //Insert one document
    collection.insertOne(color,(err,result) => {
        
        console.log("Inserted the repo")
        client.close();
        callback(result);
    }) ;

    
       
       })
       
    }





    function inserttask(color,callback){
        console.log(color);
        connect((err,client)=>{
            const db = client.db(dbName);
            const collection = db.collection('task');
             //Insert one document
        collection.insertOne(color,(err,result) => {
            console.log(color)
            console.log("Inserted the colors")
            client.close();
            callback(result);
        }) ;
    
        
           
           })
           
        }
    function deleteemployee(email,callback){
        connect((err,client)=>{
            const db = client.db(dbName);
            const collection = db.collection('employee');
             //delete one document
             collection.deleteOne({ email:email }, function(err, result) {

                console.log("Removed the document with the field a equal to "+email);
                callback(result);
        }) ;
    })
}

    function updateemployee(body,id,callback){
        connect((err,client)=>{
            console.log(id)
            const db = client.db(dbName);
            const collection = db.collection('task');
            //collection.find({'a': 3}).toArray(function(err, docs) {
                //console.log(docs);
              //});
            //update one document
            collection.updateOne({_id:new ObjectId(id)}
               , { $set: { Parent_Task:body.parent_task,Task:body.task,Start_Date:body.start_date,End_Date:body.end_date,Priority:body.priority,Flag:false} }, function(err, result) {
                console.log("Updated the document");
                console.log(result)
                callback(result);
            });  
           
           
        })
    }
    function updateflag(body,id,callback){
        connect((err,client)=>{
            console.log(id)
            const db = client.db(dbName);
            const collection = db.collection('task');
            //collection.find({'a': 3}).toArray(function(err, docs) {
                //console.log(docs);
              //});
            //update one document
            collection.updateOne({_id:new ObjectId(id)}
               , { $set: { Parent_Task:body.parent_task,Task:body.task,Start_Date:body.start_date,End_Date:body.end_date,Priority:body.priority,Flag:true} }, function(err, result) {
                console.log("Updated the document");
                console.log(result)
                callback(result);
            });  
           
           
        })
    }

module.exports={findemployee,findtaskspecific,insertparent,inserttask,deleteemployee,updateemployee,updateflag}
