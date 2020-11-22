import Users from '../database/models/user'

const batchUser = async (userids)=>{
console.log('ids===',userids );
const users = await Users.find({ _id: { $in: userids } })
return userids.map(userid=>users.find(user=>user.id===userid))
}

export default {batchUser}