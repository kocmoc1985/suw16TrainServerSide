new GenericEventHandler();

let carBmw;
let carSaab;
let owner;
let ownerB;

$(document).ready(function () {
    carBmw = new Car("bmw525D","uul575");
    carSaab = new Car("Saab900","wub585");
    
    owner = new CarOwner("Anders Andersson","48");
    ownerB = new CarOwner("Bengt Nilsson","52");
    
    owner.display('#main-content');
    ownerB.display('#main-content');
    
    owner.addCar = carBmw;
});