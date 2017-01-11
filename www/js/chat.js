var FINGER_PRINTS;
var lastMessageNr = 0;

$(document).ready(function () {
    FINGER_PRINTS = defineFingerPrint();
    $(".my-id").text("my id: " + FINGER_PRINTS);
    go();
});

function go() {
    addListenerSendBtn();
    read();
}

function addListenerSendBtn() {
    $("#send-btn").click(function () {
        var message = $('.chat-text-input').val();
        var reciever = $('.chat-send-to').val();
        //
        if(reciever.length === 0){
            reciever = false;
        }
        //
        nodeServerCall("sendMessage", "POST", FINGER_PRINTS, message, reciever, "", true);
        $(".chat-text-input").val('');
    });
}

function read() {
    console.log("Read!");
    $.ajax({
        async: true,
        type: 'POST',
        dataType: 'json',
        url: "http://localhost:3000/readMessages",
        data: {param1: FINGER_PRINTS, param2: new Date().getTime(), param3: lastMessageNr, param4: ""},
        success: function (jsonMessages) {
            //
            jsonMessages.forEach(function (message) {
                var chatEntry = $("<div class='chat-msg'></div>");
                $(chatEntry).text(message.text + " / " + message.sentby + " / " + message.nr);
                setLastMessageNr(message.nr);
                $("body").append(chatEntry);
            });
            //
            read();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("connection dropped");
            read();
        }
    });
}

/**
 * To get params in GET use: "req.query.param1"
 * To get params in POST use: "req.body.param1"
 * @param {String} link - ex 'getUsers'
 * @param {String} getPost - 'GET' or 'POST'
 * @param {String} par1
 * @param {String} par2
 * @param {String} par3
 * @param {String} par4
 * @param {Boolean} isJason
 * @returns {jqXHR.responseText}
 */
function nodeServerCall(link, getPost, par1, par2, par3, par4, isJason) {
    //
    $.ajax({
        async: isJason,
        type: getPost,
        url: "http://localhost:3000/" + link,
        data: {param1: par1, param2: par2, param3: par3, param4: par4},
        success: function (data, textStatus, jqXHR) {
           
        },
        error: function (jqXHR, textStatus, errorThrown) {
             console.log("Send message failed");
        }
    });
}

function defineFingerPrint() {
    var client = new ClientJS();
    return client.getFingerprint();
}


function setLastMessageNr(nr) {
    if (nr > lastMessageNr) {
        lastMessageNr = nr;
    }
}
