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
    ssl: { rejectUnauthorized: false }
  }).then(db => {
    app.set('db', db);
    console.log('db connected');
  });


app.use(
    expressSession({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })    
)


app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)



app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`)
})