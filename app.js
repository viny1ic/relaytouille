var bodyParser = require('body-parser')
var path = require('path')
var five = require("johnny-five"),
  board = new five.Board(),
  led = null;
var express = require('express')
var  app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./')))

board.on("ready", function() {
  console.log("### Board ready!");
  led = new five.Led(13);
  led.on();
});
var relay=0


app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.post("/relay", function(req,res){
    relay=req.body.switches
    console.log(req.body)
    var abc = new five.Pin(parseInt(relay)+1)
    if(req.body.toggle=='on'){
        abc.high()
        console.log('high')
    }
    if(req.body.toggle=='off'){
        abc.low()
        console.log('low')
    }
    res.sendStatus(200)

})

app.listen(8000, function () {
    console.log('Listening on port ' + 8000);
   });