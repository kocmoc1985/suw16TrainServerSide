//Executes first
let a;
let b;

$(document).ready(function () {
     a = new Person('Anna',25);
     b = new Person('Peter',54);
    
     a.display('#main-content');    
});

//Executes last
//$(window).load(function () {
//
//});

//let aPerson = (function () {
//    let aPerson = {
//        name: "Olle",
//        age: 38,
//        pnr: "850131-0737",
//        address: {
//            street: "Golfgatan 21",
//            zipcode: "23145",
//            town: "Malmö"
//        }
//    };
//
//    let handler = {
//        get: function (targetObj, propertyName) {
//            return Reflect.get(targetObj, propertyName);
//        },
//        set: function (targetObj, propertyName, val) {
//            if(propertyName === 'age' && (val<0) && typeof val !== Number){
//                throw(new Error("Thats a bad age"));
//            }
//            return Reflect.set(targetObj, propertyName, val);
//        },
//        deleteProperty: function (targetObj, propertyName) {
//            return Reflect.deleteProperty(targetObj, propertyName);
//        }
//    };
//    //
//    return new Proxy(aPerson, handler);
//})();
//
////
//aPerson.age = 51;


//==============================================================================
//==============================================================================