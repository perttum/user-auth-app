# Mongo-Express-React-Node app with Bcrypt user auth

Server and client base for quickstarting a MERN app.

## Installation / Usage

1. Clone the project. 
2. Run *npm install* in both /server and /client folders.
3. Create *.env* -file in the root folder of the server *
4. Start server with *npm run dev* or *npm run start* from the /server folder
5. Start client with *npm start* from the *client* folder

### Environment variables *

Declare at least these variables in your server *.env* -file:

LOCAL_PORT - The port in which you like to locally run the server.
DEV_DB_HOST - Your local Mongo DB
SECRET - Your super secret
EMAIL - The email you'd like to send password reset links from
EMAIL_PASS - Password for the email you are using