import nodemailer from "nodemailer";
import dotenv from 'dotenv'; // Import dotenv to load environment variables

dotenv.config({path: './env'}); // Load environment variables from .env file

// Configure the email transporter
// Reads mail server details and credentials from environment variables
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});


const sendEmail = async (to, subject, text) => {
  try {
    // Define the email options
    const mailOptions = {
      from: process.env.MAIL_FROM, // Sender address from environment variables
      to, // Recipient address passed as argument
      subject, // Email subject passed as argument
      text // Email plain text content passed as argument
      // You can also add 'html' for HTML content
      // html: '<p>This is <b>HTML</b> content</p>'
    };

    // Send the email using the configured transporter
    const info = await transporter.sendMail(mailOptions);

    // Log success message with the message ID
    console.log(`Email sent: ${info.messageId}`);

    // Return the information about the sent email
    return info;
  } catch (error) {
    // Log the error if sending fails
    console.error("Error sending email:", error);

    // Re-throw a new error with a more descriptive message
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// Export the sendEmail function for use in other modules
export { sendEmail };
