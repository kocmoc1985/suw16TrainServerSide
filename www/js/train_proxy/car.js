class Car extends Base {

    constructor(model, regNr) {
        super();
        this.model = model;
        this.regNr = regNr;
        this.registerWatchers();
    }

    set owner_(owner) {
        this.owner = owner;
    }
    
    get owner_(){
        return this.owner;
    }

    registerWatchers() {
        this.watch("model", function (val, oldVal) {
            console.log(`Trying to change from ${oldVal} to ${val}`);
            if(val === 'audi'){
                console.log("cannot set model = audi");
                return false;
            }          
        });

        this.watch("regNr", function (val, oldVal) {
            console.log(`You changed my age from ${oldVal} to ${val}`);
        });
    }

    toString() {
//        return `<p>model: ${this.model}</p> <p>regNr: ${this.regNr}</p> <p>owner: ${this.owner ? this.owner.name : "n/a"}</p>`;
        return `<p>model: ${this.model}</p> <p>regNr: ${this.regNr}</p>`;
    }

}


