import jwt from 'jsonwebtoken'

const verifyUser = async req =>{
    req.email = null
    try{
        const token = req.headers.authorization
        if(token) 
        {
            const tk = token.split(' ')[1]
            const payload = jwt.verify(tk,process.env.JWT_SECRET_KEY || 'yoyo')
            req.email = payload.email
        }
    }catch(err){
        console.log(err);
        throw new Error('verification error')
    }
}

export default verifyUser