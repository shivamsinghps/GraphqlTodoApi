import mongoose from 'mongoose'
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type : String,
        required : true,
    },
    todos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Todo'
        }
    ]
},{
    timestamps:true
})

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
  
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
  
        this.password = hash;
        next();
      });
    });
  });

const User_model =  mongoose.model('User',userSchema)

export default User_model