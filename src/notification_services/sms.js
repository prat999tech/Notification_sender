import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config({path: './env'});

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);


const sendSMS = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      to,                                  // Recipient's phone number
      from: process.env.TWILIO_PHONE_NUMBER // Your Twilio number
    });
    console.log('✅ SMS sent successfully:', response.sid);
    return response;
  } catch (error) {
    console.error('❌ Error sending SMS:', error);
    throw error;
  }
};

export { sendSMS };
