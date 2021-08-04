const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },
 
    active: {
        type: Boolean,
        required: true
    },
    
    relatedUserId:{
        type : Schema.Types.ObjectId,
        ref : 'User',
        required: true
    }

})

module.exports = Todo = mongoose.model('Todo', TodoSchema)