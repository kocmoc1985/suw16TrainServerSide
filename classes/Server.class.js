'use strict';

module.exports = class Server {
  constructor() {
    // save our settings to this
    this.settings = g.settings.Server;
    
    // add express to this
    this.app = m.express();

    // run the setup method
    this.setup();
  }

  setup() {
    // tell express to use middleware to parse JSON
    this.app.use(m.bodyparser.json());
    // declare a webroot
    this.app.use(
      m.express.static(
        m.path.join(g.settings.appRoot, this.settings.webroot)
      )
    );

    // compress all files using gzip
    this.app.use(m.compression());

    // parse all request cookies
    this.app.use(m.cookieparser());

    // parse all urlencoded request body data
    // for example from "standard" HTML forms
    this.app.use(m.bodyparser.urlencoded({extended: false}));

   
    var me = this;
    
//==============================================================================
//==============================================================================

// Test successful        
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/test');
//var db = mongoose.connection;
//
//db.once('open', function (){
//    console.log("Connected to MongoDB");
//});

//==============================================================================
//==============================================================================   
        
var mongoose = require('mongoose');
var catNames = require('./cats.json');
var Kitten = require('./kitten.model')(mongoose);

mongoose.connect('mongodb://10.87.0.145/test'); //mongodb://localhost/kittendb
var db = mongoose.connection;

db.once('open', function (){
    console.log("Connected to MongoDB");
    connected();
});

// To make sometihing only after connecting to the DB
function connected(){
  createCats();
}

function createCats(){
    //
    catNames.forEach(function(catName){
    var cat = new Kitten({ name: catName,age: 0});
    cat.save(function (err, cat) {
    console.log("saving: " + cat.name); 
    cat.speak();
//        if (err) return console.error(err);
//        if(err){
//            console.log(err);
//        }
        
    });
  });
}

//http://localhost:3000/find/all
this.app.get('/find/:message', function (req, res) {
    var par1 = req.params.message;
    //
    if(par1 === 'create'){
       createCats();
       res.end('Create Triggered');
    }else if(par1 === 'all'){
        Kitten.find(function(err,kittens){
            console.log("answer: ",kittens);
            res.json("answer: " + kittens);
        });
    }else if(par1 === 'name'){
        Kitten.find({name:"Nibbles"},function(err, kittens){
            console.log("answer: ",kittens);
            res.json("answer: " + kittens);
        });
    }else if(par1 === 'and'){
         Kitten.find({name:{$in:["Ladybug","Kitkat"]}},function(err, kittens){
            console.log("answer: ",kittens);
            res.json("answer: " + kittens);
        });
    }else if(par1 === 'or'){
         Kitten.find({$or:[{name:"Ladybug"},{name:"Kitkat"}]},function(err, kittens){
            console.log("answer: ",kittens);
            res.json("answer: " + kittens);
        });
    }
    
    //Here can the actual testings be performed
    if(par1 === 'act'){
        
    }
    //
    
});




//==============================================================================
//==============================================================================
var messages = [];
var responseObjectsMap = require('../www/js/moduls/hashmap');//
var msgCounter = 0;


this.app.post('/readMessages', function (req, res) {
     //
     var clientId = req.body.param1;
     var timestamp = req.body.param2;
     var lastMsgNr = req.body.param3;
     //
     addResponseObject(clientId,lastMsgNr,res);
     //
     answer();
     //
     console.log("/readMessages: " + clientId);
     console.log("/readMessages active keys: " + responseObjectsMap.keys);
});

this.app.post('/sendMessage', function (req, res) {
    //
    var sentBy = req.body.param1;
    var text = req.body.param2;
    var reciever = req.body.param3;
    //
    msgCounter++;
    //
    messages.push(
        {
            nr:msgCounter,
            timestamp: new Date().getTime(),
            sentby: sentBy,
            text: text,
            reciever: reciever
        }
    );
    //
    res.end(''); // This one is obvious
    //
    answer();
    //
    console.log("message recieved: " + text + " / " + sentBy + " / reciever: " + reciever + " / " + msgCounter);        
});

function addResponseObject(clientId,lastMsgNr,res){
    var client = {lastmsgnr:lastMsgNr, res: res};
    responseObjectsMap.put(clientId,client);
}

function getMessagesToSend(lastMsgNr,clientId){
    var toSend = [];
    //
    if(lastMsgNr<msgCounter === false){
        return toSend;
    }
    //
    messages.forEach(function(message){
//        console.log("nr: " + message.nr + " / "+ lastMsgNr);
        if(message.nr > lastMsgNr && message.reciever === 'false'){
            toSend.push(message);
        }else if(message.nr > lastMsgNr && clientId === message.reciever){
            message.text = "direct message: " + message.text;
            toSend.push(message);
        }else if(message.nr > lastMsgNr && clientId === message.sentby){
            toSend.push(message);
        }
    });
    //
    return toSend;
}

function answer(){
    //
    //
    responseObjectsMap.each(function (key,value,i){
        //
        console.log("answer(): key: " + key + " / last: " + value.lastmsgnr + " / i: " + i)
        //
        if(msgCounter > value.lastmsgnr){
            //
            var toSendMessages = getMessagesToSend(value.lastmsgnr,key);
            //
            if(toSendMessages.length > 0){
                value.res.json(toSendMessages);
                responseObjectsMap.remove(key);
            }
        }
    });
}

//==============================================================================
//==============================================================================
/**
 * http://localhost:3000/testGetA/aaaaa/bbbbb  (OBS! /:aaaaaa -> : not needed!!)
 */
this.app.get('/testGetA/:message/:message2', function (req, res) {
    var par1 = req.params.message;
    var par2 = req.params.message2;
    //
    res.send("answer: " + par1 + " / " + par2);
});


this.app.get('/testGetB', function (req, res) {
    var par1 = req.query.param1;
    var par2 = req.query.param2;
    //
    res.send("answer: " + par1 + " / " + par2);
});

//==============================================================================
//==============================================================================
   // listen on port 3000
    this.app.listen(this.settings.port,  function() {
      console.log("Server listening on port "+me.settings.port);
    });
  }
  
}


