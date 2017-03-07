class CarOwner extends Base {

    constructor(name, age) {
        super();
        this.name = name;
        this.age = age;
        this.cars = [];
        this.me = this;
    }

    //called by: GenericEventHandler
    //used in: templates.js
    headlineClick() {
        alert(this.name + ' says: Hi!');
    }

    set addCar(car) {

        if (!car) {
            return;
        }
        //
        if (car.owner_) {
            car.owner_.removeCar(car);
        }
        //
        car.owner_ = this.me;
        this.cars.push(car);
    }

    removeCar(car) {
        var that = this;
        this.cars.forEach(function (carAct, index) {
            if (carAct.regNr === car.regNr) {
                that.cars.splice(index, 1);
                that.me.name = that.me.name;
                console.log(that);
            }
        });
    }

    toString() {
        return `name: ${this.name}, cars:${this.cars}`;
    }

}