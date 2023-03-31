const User= require('../models/user')
const AWS=require('aws-sdk')
const jwt= require('jsonwebtoken')
const { registerEmailParams } = require('../helpers/email')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region:process.env.AWS_REGION
})

const ses= new AWS.SES({apiVersion:'2010-12-01'})

exports.register = (req, res) => {
    console.log('Register controller',req.body)
    const {name,email, password}= req.body
    
    User.findOne({email}).then((err,user)=>{
       if(user){
         return res.status(400).json({
            error:'Email is taken'
         }) 
       }

       const token=jwt.sign({name,email,password},process.env.JWT_ACCOUNT_ACTIVATION,{
        expiresIn:'10m'
       })
       
       const params=registerEmailParams(email,token)

    const sendEmailOnRegister = ses.sendEmail(params).promise()

    sendEmailOnRegister.then(
        response=>
        {console.log(response, 'Email has been submitted to SES')
         res.json({
            message:'Activation email sent!'
         })
       }
        
    ).catch(error=>
        {console.log(error,'Failed to send email')
         res.json({
            error: 'Email Verification Failed'
         })})

    })}

    


