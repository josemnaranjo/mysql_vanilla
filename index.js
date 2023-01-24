const express = require('express');
const app = express();
const mysql= require('mysql');


const {insert , read , update , remove} =require('./operations');

app.use(express.json());

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"josemnaranjoc",
    database:"prueba"
});


const createUsuarios = 'create table if not exists usuarios( id int primary key auto_increment, nombre varchar(255) not null, email varchar(255) not null)';


connection.query(createUsuarios,function(err,results,fields){
    if(err) console.log(err);
    console.log("Conectado a base de datos");
})

app.get("/insert",(req,res)=> {
    insert(connection, {nombre:'claudio',email:'claudio@email.com'},result => {
        res.json(result);
    })
});

app.get("/read",(req,res)=> {
    read(
        connection,
        result => {
        res.json(result);
    })
});

app.get("/update",(req,res)=> {
    update(
        connection,
        {id:2,},
        result => {
        res.json(result);
    })
});


app.get("/remove",(req,res)=> {
    remove(
        connection,
        {id:2,},
        result => {
        res.json(result);
    })
});
// connection.connect((err)=>{
//     if(err) return console.log(err);
//     console.log("Conectado a base de datos")
// })

app.listen(3000,()=>{
    console.log("Escuchando al puerto 3000")
})