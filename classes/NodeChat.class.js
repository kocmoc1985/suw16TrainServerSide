'use strict';
//ClientSide: JsonServerWriterRest
module.exports = class NodeChat {

    constructor(express) {
        this.app = express;
        this.responseObjectsMap = require('../www/js/moduls/hashmap');
        this.messages = [];
        this.msgCounter = 0;
        this.post();
    }

    post() {
        var that = this;
        this.app.post('/readMessages', function (req, res) {
            //
            var clientId = req.body.param1;
            var timestamp = req.body.param2;
            var lastMsgNr = req.body.param3;
            //
            addResponseObject(clientId, lastMsgNr, res);
            //
            answer();
            //
            console.log("/readMessages: " + clientId);
            console.log("/readMessages active keys: " + that.responseObjectsMap.keys);
        });

        this.app.post('/sendMessage', function (req, res) {
            //
            var sentBy = req.body.param1;
            var text = req.body.param2;
            var reciever = req.body.param3;
            //
            that.msgCounter++;
            //
            that.messages.push(
                    {
                        nr: msgCounter,
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
    }

    addResponseObject(clientId, lastMsgNr, res) {
        var client = {lastmsgnr: lastMsgNr, res: res};
        this.responseObjectsMap.put(clientId, client);
    }

    getMessagesToSend(lastMsgNr, clientId) {
        var toSend = [];
        //
        if (lastMsgNr < msgCounter === false) {
            return toSend;
        }
        //
        this.messages.forEach(function (message) {
//        console.log("nr: " + message.nr + " / "+ lastMsgNr);
            if (message.nr > lastMsgNr && message.reciever === 'false') {
                toSend.push(message);
            } else if (message.nr > lastMsgNr && clientId === message.reciever) {
                message.text = "direct message: " + message.text;
                toSend.push(message);
            } else if (message.nr > lastMsgNr && clientId === message.sentby) {
                toSend.push(message);
            }
        });
        //
        return toSend;
    }

    answer() {
        this.responseObjectsMap.each(function (key, value, i) {
            //
            console.log("answer(): key: " + key + " / last: " + value.lastmsgnr + " / i: " + i);
            //
            if (msgCounter > value.lastmsgnr) {
                //
                var toSendMessages = getMessagesToSend(value.lastmsgnr, key);
                //
                if (toSendMessages.length > 0) {
                    value.res.json(toSendMessages);
                    this.responseObjectsMap.remove(key);
                }
            }
        });
    }

};