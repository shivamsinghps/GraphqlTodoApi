import express from 'express'
import cors from 'cors'
import  dotenv from 'dotenv'
import { ApolloServer ,gql } from 'apollo-server-express'
import connection from './database'
import typeDefs from './schema'
import resolvers from './resolver'
import verifyUser from './middleware/auth'
/**
 * setting up the env variables
 */
dotenv.config()

/**
 * Initializing app
 */
const app = express()

/**
 * Enabling cors 
 */
app.use(cors())

/**
 * Body-parser Middleware
 */
app.use(express.json())

// connecting database with mongoose instance
connection()
/**
 * Create the ApolloServe Instance
 * 
 * @return {ApolloServer} The ApolloServer instance.
 */
const apolloserver = new ApolloServer({
    typeDefs,
    resolvers,
    context:async({req})=>{
        verifyUser(req)
        return {email:req.email}
    }
})

apolloserver.applyMiddleware({app,path:'/gql'})

export default app