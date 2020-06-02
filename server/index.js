require('dotenv').config();
const express = require('express');
const expressSession = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController')


const app = express();
const SERVER_PORT = 4000;

app.use(express.json());



const {CONNECTION_STRING, SESSION_SECRET} = process.env

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(dbInstance => {
    app.set('db', dbInstance); //the first argument is how we reference it, the second is the actual value which is the database
    console.log('db connected');
    
})


app.use(
    expressSession({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })    
)


app.post('/auth/register', authCtrl.register)



app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`)
})