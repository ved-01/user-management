const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('hbs', exphbs.engine( {extname: '.hbs'}));
app.set('view engine', 'hbs');


//Connection Pool
const pool=mysql.createPool({
    //env file me hai
    connectionLimit:100,
    host: 'localhost',
    user : 'root',
    password : 'Ved@1357',
    database: 'tut'

});

//Connect to DB
pool.getConnection((err, Connection) =>{
    if(err) throw err; //not connected
    console.log('Connected as ID' + Connection.threadId);
});


//Router
// app.get('', (req,res)=>{
//     res.render('home');
// });

const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });