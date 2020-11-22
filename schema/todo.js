import { gql } from 'apollo-server-express'

const TodosDefs = gql`
extend type Query{
    todos(cursor:String,limit:Int):TodoData
    todo(id:ID!):Todo!
}

input createtodoinput{
    title:String!
    completed:Boolean!
}

extend type Mutation{
    createTodo(input:createtodoinput!):Todo!
}

type Todo{
    "Todo ID"
    id:ID!
    "Title of the todo"
    title:String!
    "Status of the todo"
    completed:Boolean!
    user:User!
}

type TodoData{
    todoData:[Todo!]
    pageInfo: PageInfo!
}

type PageInfo{
    nextpage_pointer:String
    nextpage_exists:Boolean!
}
`

export default TodosDefs