$(document).ready(function () {
    addListenerPostBtn();
    addListenerPutBtn();
});

function addListenerPostBtn() {
    $("#post-btn").click(function () {
        $.ajax({
            async: true,
            type: "POST",
            url: "http://localhost:3000/rest/catsrouter",
            data: {name: "AAAAAACAT", age: 55, addresses: [{street: "street", city: "city", cc:"cc"}]},
            success: function (data, textStatus, jqXHR) {
                $('#output').text(JSON.stringify(data));
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Send message failed");
            }
        });
    });
}

function addListenerPutBtn() {
    $("#put-btn").click(function () {
        $.ajax({
            async: true,
            type: "PUT",
            url: "http://localhost:3000/rest/catsrouter/find/{name:'Zorro'}",
            data: {name: "AAAAAACAT", age: 55, addresses: []},
            success: function (data, textStatus, jqXHR) {
                $('#output').text(JSON.stringify(data));
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Send message failed");
            }
        });
    });
}

