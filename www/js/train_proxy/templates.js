CarOwner.registerTemplate(function(){
    return `<div class='owner' style='margin-top:20px'>
            <hr>
            <h1 data-click='headlineClick'>name:${this.name}</h1>
            <h2>cars:${this.cars === undefined?"n/a":this.cars}</h2>
            </div>`;
});

Car.registerTemplate(function(){
    return `<div class='car' style='margin-top:20px'>
            <h1>model:${this.model}</h1>
            <h2>regNr:${this.regNr}</h2>
            <h3>owner:${this.owner === undefined?"n/a":this.owner.name}</h3>
            <h3>age:${this.ownerAge}</h3>
            </div>`;
});



