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
var responseObjectsMap = new Map();
var msgCounter = 0;



this.app.post('/readMessages', function (req, res) {
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
//    console.log("message recieved: " + text + " / " + sentBy + " / " + msgCounter);        
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
//        console.log("answer(): key: " + key + " / last: " + value.lastmsgnr + " / i: " + i)
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

//setInterval(answer,5000);




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

function Map() {
    this.keys = new Array();
    this.data = new Object();

    this.put = function (key, value) {
        this.remove(key);
        if (this.data[key] == null) {
            this.keys.push(key);
        }
        this.data[key] = value;
    };

    this.get = function (key) {
        return this.data[key];
    };

    this.remove = function (key) {
//        console.log("DELETE: " + key);
        removeAllByName(this.keys,key);
        delete this.data[key];
        
        function removeAllByName(arr, name) {
            while (arr.indexOf(name) !== -1) {
                var index = arr.indexOf(name);
                arr.splice(index, 1);
            }
        }
    };
    

    this.each = function (fn) {
        if (typeof fn != 'function') {
            return;
        }
        var len = this.keys.length;
        for (var i = 0; i < len; i++) {
            var k = this.keys[i];
            if(this.data[k] === undefined){
                console.log("data = null" + " / i: " + i + " / " + this.keys[i]);
                console.log(this.keys);
              continue;
            }
            fn(k, this.data[k], i);
        }
    };

    this.entrys = function () {
        var len = this.keys.length;
        var entrys = new Array(len);
        for (var i = 0; i < len; i++) {
            entrys[i] = {
                key: this.keys[i],
                value: this.data[i]
            };
        }
        return entrys;
    };

    this.isEmpty = function () {
        return this.keys.length == 0;
    };

    this.size = function () {
        return this.keys.length;
    };
}


