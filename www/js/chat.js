var FINGER_PRINTS;

$(document).ready(function () {
    FINGER_PRINTS = defineFingerPrint();
    go();
});

function go() {
    addListenerSendBtn();
    addListenerGetBtn();
}

function addListenerSendBtn() {
    $("#send-btn").click(function () {
        var message = $('.chat-text-input').val();
        nodeServerCall("sendMessage", "POST", FINGER_PRINTS, message, "", "", false);
    });
}

var lastMessageNr = 0;

function addListenerGetBtn() {
    $("#get-btn").click(function () {
//        var jsonMessages = nodeServerCall("readMessages", "POST", FINGER_PRINTS, new Date().getTime(), lastMessageNr, "aa", true);
//
//        jsonMessages.forEach(function (message) {
//            var chatEntry = $("<div class='chat-msg'></div>");
//            $(chatEntry).text(message.text + " / " + message.sentby + " / " + message.nr);
//            setLastMessageNr(message.nr);
//            $("body").append(chatEntry);
//        });

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
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                
            }
        });

    });


}


function setLastMessageNr(nr) {
    if (nr > lastMessageNr) {
        lastMessageNr = nr;
    }
}



/**
 * To get params in GET use: "req.query.param1"
 * To get params in POST use: "req.body.param1"
 * @param {String} link - ex 'getUsers'
 * @param {String} getPost - 'GET' or 'POST'
 * @param {String} par1
 * @param {String} par2
 * @param {Boolean} isJason
 * @returns {jqXHR.responseText}
 */
function nodeServerCall(link, getPost, par1, par2, par3, par4, isJason) {
    //
    var rst = $.ajax({
        async: false,
        type: getPost,
        url: "http://localhost:3000/" + link,
        data: {param1: par1, param2: par2, param3: par3, param4: par4}
    }).responseText;
    //
    if (isJason) {
        return JSON.parse(rst);
    } else {
        return rst;
    }
    //
}

function defineFingerPrint() {
    var client = new ClientJS();
    return client.getFingerprint();
}
