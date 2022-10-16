module.exports  = async (req,res,next)=>{
   const token  = re.header( 'x-auth-token');
   if(!token) {
        return res.status(422).json({
            errors: [
                {
                    msg: "no token",
                }
            ]
        })
    }
    try{
        let user  =jwt.verify(token,'qweqweqeeqeqe123123123213')
    }catch(error){
        return res.status(422).json({
            errors: [
                {
                    msg: "invalid token ",
                }
            ]
        })
    }

}