# Notification_sender

Features
Send Notification:

POST /notifications

Send notifications to users via email, SMS, or in-app.

Get User Notifications:

GET /users/{id}/notifications

Retrieve all notifications for a specific user.

Notification Types:

Email notifications

SMS notifications

In-app notifications


Tech Stack:-
Node.js

Express.js

MongoDB (Mongoose)

Nodemailer (Email)

Twilio 



Setup Instructions:

Clone the repository:

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name


Install dependencies:

I have install dependencies like express,dotenv,twilio.nodemailer,nodemon and mongoose

npm install


Start The Server:

npm run dev

Test the API:

Use Postman or curl to:

POST /notifications to send a notification

GET /users/{id}/notifications to retrieve user notifications



Assumptions:-

Users are identified by a unique userId string.

Environment variables are managed securely and never committed to the repository.

Mailtrap is used for email testing; Twilio for SMS.

