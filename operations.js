const mysql = require('mysql');

function insert(connection, data, callback){
    let insertQuery = "INSERT INTO usuarios (nombre,email) VALUES (?,?)";
    let query= mysql.format(insertQuery,[data.nombre,data.email])
    connection.query(query,function(err,result){
        if(err) return console.log(err);
        callback(result)
    })
};

function read(connection,callback){
    connection.query('SELECT * FROM usuarios',function(err,result){
        if(err) console.log(err);
        callback(result);
    })
};

function update(connection,data,callback){
    const randomLetters = Math.random().toString(36).substring(7);
    const newEmail= `${randomLetters}@email.com`;
    let updateQuery = "UPDATE usuarios SET email = ? WHERE id = ?";
    let query = mysql.format(updateQuery, [newEmail,data.id]);
    connection.query (query, function(err,result){
        if(err) console.log(err);
        callback(result);
    })
};

function remove(connection,data,callback){
    let removeQuery = "DELETE FROM usuarios WHERE id = ?";
    let query = mysql.format(removeQuery,[data.id]);

    connection.query (query, function(err,result){
        if(err) console.log(err);
        callback(result);
    })
}

module.exports = {insert ,read , update , remove };