const express = require('express')
const app = express();
const parser = require('body-parser')
const mysql = require('mysql2')
const port = 3000;
app.use(parser.json())
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rishiyash0109",
    database:"students"
  });
  
  connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        
  });

  app.listen(port,() => console.log("server started..."));

//   app.get('/student',function(req,res)
//   {
//       sql="select * from student";
//       query=connection.query(sql,(err,rows,fields)=>{
//           if(err){
//               res.send(rows);
//           }
//       })
//   })



  app.get("/students",(req,res) => {
        const sql = "SELECT * FROM student";
        connection.query(sql,(err,rows,fields) => {
            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            } 
        })
  })

  app.get("/students/:id",(req,res) => {
      var id=req.params.id;
    const sql = "SELECT * FROM student WHERE regNo ="+id;
    connection.query(sql,(err,rows,fields) => {
        if(!err){
            res.send(rows)
        }else{
            console.log(err)
        } 
    })
})


app.get('/update/:id',(req,res) => {
    const name = 'abhishek'
    const sql = `UPDATE student SET SName=${name} WHERE regNo=?`
    connection.query(sql,[req.params.id],(err,result) => {
        if(err) throw err
        else res.send("record updated");
    })
})

app.get('/add',(req,res) => {
    const json = {"regNo":2147236,"SName":"Yash","Address":"Ranchi","phone":"8564785621","gender":"m"};
    const sql = 'INSERT INTO student set ?'
    connection.query(sql,json,(err,result) => {
        if(err) throw err
        else res.send("record added");
    })
})

app.get('/delete/:id',(req,res) => {
    const sql = `DELETE FROM student WHERE regNo=?`
    connection.query(sql,[req.params.id],(err,result) => {
        if(err) throw err
        else res.send("record updated");
    })
})