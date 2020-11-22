import { gql } from 'apollo-server-express'

const UsersDefs = gql`
extend type Query{

    user:User!
}

input UserSignUp{
    name:String!
    emailId:String!
    password:String!
}

input UserLogin{
    emailId:String!
    password:String!
}

extend type Mutation{
    signUp(input:UserSignUp!):User
    login(input:UserLogin!):Token
}

type Token{
    token:String!
}

type User{
    "User ID" 
    id:ID!
    "User Name"
    name:String!
    "User Email"
    email:String!
    "todos of the particular user"
    todos:[Todo!]
}
`
export default UsersDefs