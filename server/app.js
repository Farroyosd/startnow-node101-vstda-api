const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser')
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

// add your code here
var dataArray = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

app.get('/', function (req, res) {
  var ok = { status: 'ok'}
  
      res.send(ok);

});

app.get('/api/TodoItems', function (req, res) {
    res.send(dataArray);
  
  });

  app.get('/api/TodoItems/:number', function (req, res) {
    
   var todoId = req.params.number;

   for(let i = 0; i < dataArray.length; i++){
       if(dataArray[i].todoItemId == todoId){
           res.send(dataArray[i]);
       }
   }

  
  });
  
  app.post('/api/TodoItems/', function (req, res){
    var newTodo = {
        'todoItemId' : req.body.todoItemId,
        'name' : req.body.name,
        'priority' : req.body.priority,
        'completed' : req.body.completed
    }
    var replace = false
    
    for (let i = 0; i < dataArray.length; i++){
    if (dataArray[i].todoItemId == newTodo.todoItemId){
        dataArray.splice(i,1,newTodo);
        replace = true;
        }
    }
    if(replace !== true){
        dataArray.push(newTodo);
                }

    res.status(201).json(newTodo);
    
  });

  app.delete('/api/TodoItems/:number', function (req, res) {
    
   var todoId = req.params.number;
   var item = null; 
   for(let i = 0; i < dataArray.length; i++){
       if(dataArray[i].todoItemId == todoId){  
        
        item = dataArray[i];
        dataArray.splice(i,1);
           
       }
   }

   res.status(200).json(item);
   
  
  });



module.exports = app;
