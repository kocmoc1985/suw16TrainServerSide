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
    //
    msgCounter++;
    //
    messages.push(
        {
            nr:msgCounter,
            timestamp: new Date().getTime(),
            sentby: sentBy,
            text: text
        }
    );
    //
    res.end(''); // This one is obvious
    //
    answer();
    //
    console.log("message recieved: " + text + " / " + sentBy + " / " + msgCounter);        
});

function addResponseObject(clientId,lastMsgNr,res){
    var client = {lastmsgnr:lastMsgNr, res: res};
    responseObjectsMap.put(clientId,client);
}

function getMessagesToSend(lastMsgNr){
    var toSend = [];
    //
    if(lastMsgNr<msgCounter === false){
        return toSend;
    }
    //
    messages.forEach(function(message){
//        console.log("nr: " + message.nr + " / "+ lastMsgNr);
        if(message.nr > lastMsgNr){
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
            var toSendMessages = getMessagesToSend(value.lastmsgnr);
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
 * http://localhost:3000/testGetA/:aaaaa/:bbbbb
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

