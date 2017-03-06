class Base {
    
    constructor() {
        Base.co = Base.co || 0;
        Base.co++;
        this.instanceId = Base.co;
        
        return new Proxy(this, ProxyHandler);
    }
    
    static addToMem(){
        this.mem = this.mem || {};
    }
    
    display(selector){
        let template = $(this.template || '');
        $(template).attr('data-instance-id',this.instanceId);
        $(selector).append(template);
    }
    
    displayUpdate(){
        console.log("update display:",this.template);
        $('[data-instance-id="'+ this.instanceId + '"]').html(this.template || '');
    }
}