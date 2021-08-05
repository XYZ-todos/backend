const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router(); 
const auth = require('../middleware/jwtMiddleware')

 
/*
@route  POST todos/add
@desc   Create a Todo
@access private
*/
router.post('/add', auth, (req, res) => {
    //get user id using jwt token
    const relatedUserId = req.user.id
    const { title, description, active } = req.body
    const newTodo = new Todo({ title, description, active, relatedUserId })
    newTodo.save()
        .then(Todo => res.json(Todo))
        .catch((e) => {
            res.status(404).json({ success: false, error: e })
        })
})



/*
@route  GET todos/getTodos
@desc   Get all todos related to single user
@access private
*/
router.get('/getTodos', auth, (req, res) => {
    //get user id using jwt token
    const relatedUserId = req.user.id

    return Todo.find({relatedUserId})
        .sort({ date: -1 })
        .then(Todos => res.json(Todos))
        .catch((e) => {
            res.status(404).json({ success: false, error: e })
        })
  
})

/*
@route  GET todos/getActiveTodos
@desc   Get all active todos related to single user
@access private
*/
router.get('/getActiveTodos', auth, (req, res) => {
    //get user id using jwt token
    const relatedUserId = req.user.id

    return Todo.find({relatedUserId , 'active' : true })
        .sort({ date: -1 })
        .then(Todos => res.json(Todos))
        .catch((e) => {
            res.status(404).json({ success: false, error: e })
        })
  
})



/*
@route  PUT todos/update/:id
@desc   update specific todo
@access private
*/
router.put('/update/:id', auth, (req, res) => {
    //get user id using jwt token
    const relatedUserId = req.user.id 
    const data = req.body
    return Todo.findOneAndUpdate( relatedUserId ,data) 
        .then(Todos => res.json({...Todos._doc , ...data}))
        .catch((e) => {
            res.status(404).json({ success: false, error: e })
        })
 
  
})



/*
@route  PUT todos/complete/:id
@desc   complete a todo
@access private
*/
router.put('/complete/:id', auth, (req, res) => {
    //get user id using jwt token
    const relatedUserId = req.user.id 
    const data = req.body
    return Todo.findOneAndUpdate( relatedUserId ,{'active':false}) 
        .then(Todos => res.json({...Todos._doc , ...data}))
        .catch((e) => {
            res.status(404).json({ success: false, error: e })
        })
 
  
})


/*
@route  DELETE todos/:id
@desc   delete a todo
@access private
*/
router.delete('/delete/:id', auth, (req, res) => { 
    const id = req.params.id
    return Todo.deleteOne({_id:id})
        .then(Todos => res.json({...Todos._doc , ...data}))
        .catch((e) => {
            res.status(404).json({ success: false, error: e })
        })
 
  
})



module.exports = router