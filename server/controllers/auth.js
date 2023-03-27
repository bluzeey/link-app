const AWS=require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region:process.env.AWS_REGION
})

const ses= new AWS.SES({apiVersion:'2010-12-01'})

exports.register = (req, res) => {
    console.log('Register controller',req.body)
    const {name,email, password}= req.body
    const params={
        Source: process.env.EMAIL_FROM,
        Destination:{
            ToAddresses:[email]

        }, 
        ReplyToAddresses:[
            process.env.EMAIL_TO
        ],
        Message:{
            Body:{
                Html:{
                    Charset:'UTF-8',
                    Data:`<html>
                          <body>
                          <h1 style="color:red;">Hello ${name}</h1>
                          <h2>Thanks for creating an account here. Feel free to contribute to the space.</h2>
                          </body>
                          </html>`
                }
            },
            Subject:{
                Charset:'UTF-8',
                Data:`Complete your registration.`
            }
        }
    }
    const sendEmailOnRegister = ses.sendEmail(params).promise()

    sendEmailOnRegister.then(
        response=>console.log(response, 'Email has been submitted to SES')
    ).catch(error=>
        {console.log(error,'Failed to send email')
         res.send('email failed')})
};


