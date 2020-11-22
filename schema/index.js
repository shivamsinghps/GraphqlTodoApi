import UserSchema from './user'
import TodoSchema from './todo'

import { gql } from 'apollo-server-express'

// Schema Stiching
const typeDefs = gql`
type Query{
    _root:String
}
type Mutation{
     _root:String
}
${UserSchema}
${TodoSchema}
` 
export default typeDefs