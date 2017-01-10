/**
 * Will search for given file in the "www" folder
 * @param {String} path = ex: "www"
 * @param {String} fileName = "menu-mobile.png"
 * @returns {jqXHR.responseText}
 */
function node_get_file_path(path, fileName) {
    //
    var param = "getFilePath";
    //
    var rst = $.ajax({
        async: false,
        type: "POST",
        url: "http://localhost:3000/" + param,
        data: {param1: path, param2: fileName}
    }).responseText;
    //
    return rst;
}

//==============================================================================
//==============================================================================

/**
 * var array = executeSync("select * from blogg", "executeSelect");
 * @param {type} query
 * @param {type} nodePar
 * @returns {Array|Object}
 */
function executeSync(query, nodePar) {
    var jsonStr =  $.ajax({
        async: false, //is true by default
        type: "POST",
        url: "http://localhost:3000/" + nodePar,
        data: {query: query}
    }).responseText;
    //
    return JSON.parse(jsonStr);
}

/**
 * Not sure it's a good idea to send connection parameters from client side
 * @returns {undefined}
 */
function node_client_connect_db() {
    $.ajax({
        async: "true",
        type: "POST",
        url: "http://localhost:3000/connectMySql",
        data: {ip: "localhost", user: "root", pass: "", database: "vedalife_se"}
    }).done(function (msg) {
        processNodeResponse(msg);
    });
}

//==============================================================================
//==============================================================================



function node_test_basic() {
    //
    var param = "nodeTest";
    //
    $.ajax({
        async: "true",
        type: "POST",
        url: "http://localhost:3000/" + param,
        data: {param1: "Node.js", param2: "test successful"}
    }).done(function (response) {
        node_test_basic_response(response);
    });
}

function node_test_basic_response(response, title) {
    //
    var testDivResponse = $("<div class='test-div-response'></div>");
    //
    if (title) {
        var h2 = $("<h5>" + title + "</h5>");
        $(testDivResponse).append(h2);
    }
    //
    var response_ = $("<p>"+ response + "</p>");
    //
    $(testDivResponse).append(response_);
    $(".test-div-a").append(testDivResponse);
    //
}

/**
 * 
 * @param {type} query = select * from articles
 * @param {type} nodePar  = executeSelect
 * @returns {undefined}
 */
function node_test_sql_basic(query, nodePar) {
    $.ajax({
        async: "true", //is true by default
        type: "POST",
        url: "http://localhost:3000/" + nodePar,
        data: {query: query}
    }).done(function (rowsAsJson) {
        node_test_sql_basic_resp(rowsAsJson);
    });
}

function node_test_sql_basic_resp(rowsAsJson) {
    //
    var randomInt = getRandomInt(1, 6);
    //
    var title = rowsAsJson[randomInt].title;
    //
    $(".test-div-a").append("<div class='test-div-response'>" + " sql test: " + title + "</div>");
}


