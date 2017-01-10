function Allmessages() {
    var messages = [];

    this.addMessage = function (message) {
        this.messages.push(message);
    };
}

function Message(timestamp, user, text) {
    this.timestamp = timestamp;
    this.sentBy = user;
    this.text = text;

    this.toString = function () {
        return "";
    };
}

function User(responseObj, name, id) {
    this.responseObj = responseObj;
    this.name = name;
    this.id = id;
}

function Users() {
    var messages = [];

    this.addUser = function (user) {
        this.messages.push(user);
    };
}