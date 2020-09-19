const mongoose = require ('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type:String,
        required:true,
        trim:true,
    
    },
    priority: {
        type: Number,
        required:true
    },
    completed: {
        type:Boolean,
        required:false,
        default:false
    },
    // duration: {
    //     type:Number,
    //     required:true,
    //     min: [1, 'Duration is too short']
    // },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }
}, {
    timestamps:true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task