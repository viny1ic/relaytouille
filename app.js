var bodyParser = require('body-parser')
var path = require('path')
const { exec } = require("child_process");

var express = require('express')
var  app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./')))


app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '../index.html'))
})
app.get('/Kali-Linux-GUI', function(req,res){
    res.sendFile(path.join(__dirname, '../index.html'))
})
app.get('/admin', function(req,res){
    res.sendFile(path.join(__dirname, '../admin.html'))
})
app.get("/relay", function(req,res){
    
    // implement call to python script
    var num = req.query.switches-1
    var status = req.query.status
    console.log(num + typeof(num))
    console.log(status + typeof(status))
    exec(`sudo python relay.py -n ${num} -v ${status}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    res.sendStatus(200)

})

app.listen(80, function () {
    console.log('Listening on port ' + 80);
   });