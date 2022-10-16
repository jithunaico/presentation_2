const router = require("express").Router();
const {check, validationResult}  =require("express-validator")
const{users}  = require("../db")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


router.post('/signup',[
    check("email","Plese provide a valid email")
        .isEmail(),
    check("password","Please provide a password greater than 5 ").
        isLength({
            min:6
        })
    ],async (req,res)=>{

   const {password,email} = req.body
   console.log(password,email)   

   //Validate done
   const errors = validationResult(req);

   if(!errors.isEmpty()){
        return res.status(400)
        .json({
            errors:errors.array()
        })
   }

   //validation user

   let user = users.find((user)=>{
    return user.email === email
   });

   if(user) {
    return res.status(422).json({
        errors: [
            {
                msg: "This user already exists",
            }
        ]
    })
}
  const hashed_password = await bcrypt.hash(password, 10);
  console.log(hashed_password);

  users.push({
    email,
    password:hashed_password
  })

  const token  = await jwt.sign({
    email
},"qweqweqeeqeqe123123123213",
{expiresIn:36000})

   res.json({token}) 

})

router.post('/login',async(req,res)=>{
    const { password,email } = req.body

    let user = users.find((user)=>{
        return user.email === email
    })

    if(!user) {
        return res.status(422).json({
            errors: [
                {
                    msg: "invalid credetials",
                }
            ]
        })
    }
    let isMatch = bcrypt.compare(password,user.password);

    if(!isMatch) {
        return res.status(422).json({
            errors: [
                {
                    msg: "invalid credetials",
                }
            ]
        })
    }
    const token  = await jwt.sign({
        email
    },"qweqweqeeqeqe123123123213",
    {expiresIn:36000})
    
       res.json({token}) 

})


router.get("/all",(req,res)=>{
    res.json({users})

})

module.exports = router