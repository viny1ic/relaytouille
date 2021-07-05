var bodyParser = require('body-parser')
var path = require('path')
const { exec } = require("child_process");

var express = require('express')
var  app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./')))


app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.post("/relay", function(req,res){
    
    // implement call to python script
    var num = req.body.switches-1
    exec(`python arduino.py -n ${num}`, (error, stdout, stderr) => {
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

app.listen(8000, function () {
    console.log('Listening on port ' + 8000);
   });