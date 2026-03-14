import nodemailer from "nodemailer";
export const sendEmail = async ({to,subject,html}) =>{
    const transporter = nodemailer.createTransport({
       host: "smtp.gmail.com",
       port: 587,       
       secure: false,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.APP_PASSWORD,
        }
    });

   await transporter.sendMail({
  from: `"Clover-Clothing" <${process.env.EMAIL_USER}>`,
  to,
  subject,
  html
});
};