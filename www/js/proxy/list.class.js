/* 
 * This class can be used to be able to catch when something is 
 * pushed poped deleted.. from an array
 */
class List extends Array {

    constructor() {
        super();
        return new Proxy(this, ProxyHandler);
    }

    //called by: ProxyHandler
    listMakeChanges(propName, val, oldVal) {
        console.log("listMakeChanges: ", val);
    } 

}

// let a = new List();
// a.push(car1,car2);


