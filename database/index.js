import mongoose from 'mongoose'

const connection = async () =>{
    try{
    await mongoose.connect(process.env.MONGO,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log('database connection established');
    }catch(err){
        console.log(err.message);
        throw err
    }
}

export default connection