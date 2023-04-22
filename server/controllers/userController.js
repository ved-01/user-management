const mysql = require('mysql');


//Connection Pool
const pool=mysql.createPool({
    //env file me hai
    connectionLimit:100,
    host: 'localhost',
    user : 'root',
    password : 'Ved@1357',
    database: 'tut'

});

//view users
exports.view = (req, res) => {
    pool.getConnection((err, Connection) =>{
        if(err) throw err; //not connected
        console.log('Connected as ID' + Connection.threadId);

        Connection.query('SELECT * FROM user', (err, rows) =>{
            Connection.release();

            if(!err){
                res.render('home', {rows});
            } else{
                console.log(err);
            }

            console.log('The data from user table: \n', rows);
        });
    });
}
