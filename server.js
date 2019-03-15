var express = require('express')
var app = express()
var repo=require('./repo')
var bodyParser=require('body-parser');
var cors=require('cors');
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/task', function (req, res) {
    repo.findemployee((err,data)=>{
        res.json(data);
    });
})
app.get('/task/:task_id', function (req, res) {
    var id=req.params.task_id
    console.log(id)
    repo.findtaskspecific(id,(err,data)=>{
        console.log(data)
        res.json(data);
    });
})
 
app.post('/tasks', function (req, res) {
    var color=req.body

    var sample={"Parent_Task":color.parent_task}
    var parent_id
    var task

    repo.insertparent(sample,(result)=>{

           
        })

    task={"Parent_Task":color.parent_task,"Task":color.task,"Start_Date":color.start_date,"End_Date":color.end_date,"Priority":color.priority,"Flag":color.Flag}
    repo.inserttask(task,(result)=>{
                    res.status(201).json({message:"Inserted the document"})
    })

})


 

app.put('/edittasks/:id', function (req, res) {
    var body=req.body;
    var id=req.params.id
    console.log(req.body)

    repo.updateemployee(body,id,(result)=>{
    res.status(202).json({message:"updated the document",})
    })
    })

    app.put('/endtask/:id', function (req, res) {
        var body=req.body;
        var id=req.params.id
        console.log(req.body)
    
        repo.updateflag(body,id,(result)=>{
        res.status(202).json({message:"updated the document",})
        })
        })


    app.delete('/employees/:email', function (req, res) {
        var email=req.params.email
        repo.deleteemployee(email,(result)=>{
        res.status(202).json({message:"Deleted the document",email:email})
        })
        })
app.listen(5001,()=>console.log("Listening to port 5001..."))