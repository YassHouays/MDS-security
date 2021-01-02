const express = require("express");
const app = express();
const server = require('http').createServer(app);
const session = require('express-session');
const dotenv = require('dotenv').config()
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const io = require('socket.io')(server);
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('../config/key/app/key.pem'),
    cert: fs.readFileSync('../config/key/app/cert.pem')
  };

/**
* Init des objets de l'app
*/
let Auth = new (require('./model/Auth'))()
let User = new (require('./model/User'))()

/**
* Config de l'application
*/
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cors());
// app.use(helmet());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: "E€$=vD6€HxP6vg&U33h2LZ96!;3Q4tm>mRµ", saveUninitialized: true, resave: true }))
app.use(async (req, res, next) => {
    req.Auth = Auth;
    req.User = User;
    
    const logged = await Auth.isLogged(req);
    req.logged = logged;

    const my_data = (logged) ? await User.getAccountData("email", req.cookies.email) : false;
    req.my_data = my_data;
    
    next();
});




/**
* Router
*/
const router = require('./routes/routes');
app.use('/', router);



/**
* Lancement du serveur
*/
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening to requests on ${process.env.BASE_URL}`);
});
https.createServer(options, app).listen(8080);
