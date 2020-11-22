import {skip} from 'graphql-resolvers'

const isAuthenticated = (_,__,{email}) =>{
    if(!email){
        throw new Error("Access Denied bro sorry")
    }
    return skip
}
export default isAuthenticated