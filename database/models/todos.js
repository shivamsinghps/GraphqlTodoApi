import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true,
    },
    completed:{
        type : Boolean,
        required : true,
    },
    user: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    },
    {
        timestamps:true
    }
)

const Todo_model = mongoose.model('Todo',todoSchema)

export default Todo_model