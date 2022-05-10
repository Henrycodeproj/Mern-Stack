import sgMail from "@sendgrid/mail"
import dotenv from 'dotenv'

dotenv.config()
sgMail.setApiKey(process.env.API_KEY_EMAIL)

export const sendMail = async (msg) =>{
    try{
        await sgMail.send(msg)
        console.log('verification email sending...')
    } catch(error){
        console.log(error)
    }
}

export default sendMail