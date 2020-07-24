const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('note-app'));

app.listen(port, ()=> console.log(`note-app listening on port ${port}`));


//sequelize setup 
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mydb', 'admin', 'BabaYaga@Dota2',{
    host: "localhost",
    dialect: "mysql"
});

sequelize
.authenticate()
.then(() => {
    console.log('connection has been established successfully!');
})
.catch(err => {
    console.log(`unable to connect to the database:`, err);
});

//creating a model
const Note = sequelize.define('notes', {note: Sequelize.TEXT, tag: Sequelize.STRING});



sequelize.sync({force: true})
.then(() => {
    console.log(`Database and tables created!`);

    Note.bulkCreate([
        { note: `pick up some bread after work`, tag: `shopping`},
        { note: `Remember to write up meeting notes`, tag: `work`},
        { note: `learn how to use node orm`,  tag: `work`}
    ]).then(function(){
        return Note.findAll();
    }).then(function(notes){
        console.log(notes);
    })
});

app.get('/notes', function(req, res){
    Note.findAll().then(notes => res.send(notes));
});

