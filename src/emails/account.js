const sgMail = require ('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from:'pgcjameskim@gmail.com',
        subject: 'Thanks for Registing for the Task Manager',
        text: `
        Welcome to the application, ${name}. 

        This application was created solely for the purpose of showcasing my skillsets. 
        Please give me constructive feedback on what can be improved. I hope you do enjoy the app. 

        Best Regards,
        James Kim `
    })
}

const sendFarewellEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'pgcjameskim@gmail.com',
        subject: 'Verification for deleting account on Task Manager',
        text: `
        Sorry to see you go, ${name}. 
        
        I would love any feeback on why you deleted your account, and what I can do to improve your experience.
        Thanks for interacting with my featured project. 

        Best Regards,
        James Kim
        
        
        `
    })
}

module.exports = {
    sendWelcomeEmail,
    sendFarewellEmail
}