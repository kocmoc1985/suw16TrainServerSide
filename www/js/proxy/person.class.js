class Person extends Base {

    constructor(name, age) {
        super();
        this.name = name;
        this.age = age;
    }

    
    get template(){
        return  `<div class="person">
                <h1>${this.name}</h1>
                <p>Name:${this.name}</p>
                <p>Age:${this.age}</p>
                </div>`;
    }
}
