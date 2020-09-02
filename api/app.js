const express = require ("express");
var cors = require('cors');
const app = express();
const bodyParser = require('body-Parser');
const {mongoose} =  require('./db/mongoose');
const { List, Task } = require('./db/models');
const { translateAliases } = require("./db/models/list.model");


// middleware to pass the http req.
app.use(bodyParser.json());


 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
   res.header("Access-control-Allow-Methods","get,post,patch,delete");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

  });



app.options('*', cors())
//to get a list
app.get("/lists", (req,res)  => {
    List.find().then((lists) =>{
        res.send(lists);
    }).catch((e) =>{
        res.send(e);
    });
    //res.send("hi i am pranit")
})

//to create a list
app.post("/lists",(req,res) =>{
    let title = req.body.title;
 
    let newList = new List ({
       title:title
    });
    newList.save().then((listDoc) =>{
        res.send(listDoc);
    }).catch((e) =>{
        res.send(e);
    });
})

//to upadate the lists using parameter id
app.patch("/lists/:id",(req,res) =>{
    List.findOneAndUpdate({_id: req.params.id},{
        $set: req.body
    }).then(()=> {
            //res.sendStatus(200)
            res.send({'message':'List updated successfully'})
    });
});

//to delete the data
app.options('/lists/:id', cors())
app.delete("/lists/:id",cors(),(req,res) =>{
    List.findOneAndDelete({
        _id: req.params.id
    }).then((removedListDoc) =>{
        res.send(removedListDoc)
    })
});

app.get("/lists/:listId/tasks",(req,res) =>{
    Task.find({
        _listId: req.params.listId
    }).then((tasks) =>{
        res.send(tasks);
    })
});


app.post("/lists/:listId/tasks",(req,res) =>{
    
    let title= req.body.title;
    let _listId= req.params.listId;

    let newTask = new Task({
        title:title,
        _listId:_listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDOc);
    }).catch((e) =>{
        res.send(e);
    });
})

app.patch("/lists/:listId/tasks/:taskId",(req,res) =>{
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    },{
        $set: req.body
    }).then(()=> {
            res.sendStatus(200)
    });
});


app.delete("/lists/:listId/tasks/:taskId",(req,res) =>{
    Task.findOneAndDelete({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) =>{
        res.send(removedTaskDoc)
    })
});



app.listen("3000",() => {
    console.log("App is listening on port 3000");
})