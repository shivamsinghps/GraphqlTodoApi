import Users from '../database/models/user'
import Todos from '../database/models/todos'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {combineResolvers} from 'graphql-resolvers'
import isAuthenticated from '../middleware/graph_auth'

const Query = {
    user: combineResolvers(isAuthenticated,async(_,__,{email})=>{
        try{
        const user = await Users.findOne({email})
        if(user)
        return user
        else{
            throw new Error('User does not exists! ')
        }
    }catch(err){
        console.log(err.message);
        throw err
    }
    }),
}

const Mutation = {
    signUp : async (_,{input:{name,emailId,password}}) =>{
        try{
        const user = await Users.findOne({email:emailId})
            if(user){
                throw new Error('Email already exists')
            }else{
                const newUser = new Users({
                    name,
                    email:emailId,
                    password
                })

                const res = await newUser.save()
                return res

            }

        }catch(err){
            console.log(err.message);
            throw err
        }
    },
    login : async(_,{input:{emailId,password}})=>{
        const user = await Users.findOne({email:emailId})
        if(user){
            const pass_valid = await bcrypt.compare(password, user.password)
            if(pass_valid){
               const secret = process.env.JWT_SECRET_KEY || 'yoyo'
               const token = jwt.sign({email:user.email},secret,{expiresIn:'1d'})
               return {token}

            }else{
                throw new Error("Invalid Credentials")
            }
        }else{
            throw new Error("User not found")
        }
    }
}

const User = {
     todos: async(parent) =>{
         try {
             console.log(parent);
            const todos = await Todos.find({user:parent.id})
            return todos
        } catch (error) {
             console.log(error);
             throw error
         }
     }
}

export default { Query,User,Mutation }