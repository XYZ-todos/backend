const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({

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
    
    related_user:{
        type : Schema.Types.ObjectId,
        ref : "User",
        required: true
    }

})

module.exports = User = mongoose.model('Todo', ItemSchema)