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
//Find user
exports.find = (req,res) => {
    pool.getConnection((err, Connection) =>{
        if(err) throw err; //not connected
        console.log('Connected as ID' + Connection.threadId);

        let searchTerm = req.body.search; //search is the actual input from user
        Connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name like ? OR email like ? OR phone like ? or id like ?', ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%','%' + searchTerm + '%','%' + searchTerm + '%' ] ,(err, rows) =>{
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

exports.form = (req,res) => {
    res.render('add-user');
}

//Add user
exports.create = (req,res) => {
const { first_name, last_name, email, Phone, comments} = req.body;

    pool.getConnection((err, Connection) =>{
        if(err) throw err; //not connected
        console.log('Connected as ID' + Connection.threadId);

        let searchTerm = req.body.search; //search is the actual input from user
        
        Connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, Phone = ?, comments = ?',[first_name, last_name, email, Phone, comments] ,(err, rows) =>{
            Connection.release();

            if(!err){
                res.render('add-user', {alert: 'User added successfully'});
            } else{
                console.log(err);
            }

            console.log('The data from user table: \n', rows);
        });
    });
}