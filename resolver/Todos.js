import Users from '../database/models/user'
import Todos from '../database/models/todos'
import {combineResolvers} from 'graphql-resolvers'
import isAuthenticated from '../middleware/graph_auth'

const Query = {
    // Do remmber cursor should be opaque(actual value hidden)
   todos:combineResolvers(isAuthenticated,async(_,{cursor,limit=5},{email})=>{
   try {
    const user = await Users.findOne({email}) 
    const query = {user:user.id}
    if(cursor){
        query['_id']={
            '$lt':cursor
        }
    }
    let todos = await Todos.find(query).sort({'_id':-1}).limit(limit+1)
    const nextpage_exists = todos.length > limit
    todos = nextpage_exists ? todos.slice(0,-1):todos

    return {
        todoData:todos,
        pageInfo:{
            nextpage_pointer:nextpage_exists?todos[todos.length-1].id:null,
            nextpage_exists
        }
    }       
   } catch (error) {
       console.log(error.message);
       throw error
   }
   
}),

todo:combineResolvers(isAuthenticated,async(_,{id},{email})=>{
    try {
     const user = await Users.findOne({email}) 
     const todo = await Todos.findOne({_id:id,user:user.id})
     return todo      
    } catch (error) {
        console.log(error.message);
        throw error
    }
 }),

}

const Mutation = {
 createTodo:combineResolvers(isAuthenticated,async(_,{input:{title,completed}},{email})=>{
    try {
        const user = await Users.findOne({email})
        const newTodo = new Todos({
            user:user.id,
            title,
            completed
        })
        const res = await newTodo.save()
        user.todos.push(res.id)
        await user.save()
        console.log();
        return res        
    } catch (error) {
        console.log(error);
        throw error
    }
 }),

}

const Todo = {
    user:async (parent)=>{
      try {
        const user = await Users.findOne({_id:parent.user})
        return user
      } catch (error) {
        console.log(error);
        throw error
      }
    }

}

export default { Query,Todo,Mutation }