class Base {

    constructor() {
        Base.co = Base.co || 0;
        this.instanceId = Base.co;

        this.watchers = [];

        let proxy = new Proxy(this, ProxyHandler);

        Base.mem = Base.mem || [];
        Base.mem[Base.co] = this;
        Base.co++;
        return proxy;
    }

    //called by: person.class
    watch(propToWatch, funcToRun) {

        this.watchers.push({
            propToWatch: propToWatch,
            funcToRun: funcToRun
        });
    }

    //called by: proxyhandler
    callWatchers(propName, val, oldVal) {
        var okToChange = true;
        for (let watcher of this.watchers) {
            if (propName == watcher.propToWatch) {
                if (watcher.funcToRun(val, oldVal) === false) {
                    okToChange = false;
                }
            }
        }
        return okToChange;
    }

    //
    display(selector) {
        let template = $(this.template || '');
        $(template).attr('data-instance-id', this.instanceId);
        let html = $('<div/>').append(template).html();
        $(selector).append(template);
        return html;
    }

    //called by: proxyhandler
    displayUpdate() {
        var that = this;
        clearTimeout(this.updateRun);
        this.updateRun = setTimeout(function () {
            $('[data-instance-id="' + that.instanceId + '"]').html($(that.template).html() || '');
        }, 50);
    }

    get template() {
        //Check what class this instance comes from
        let myClass = this.constructor;
        //Retrieve the static method templateFunc
        let func = myClass.templateFunc || function () {};
        //run the function with this instance as "this"
        return func.apply(this);
    }

    static registerTemplate(func) {
        //this here is whole Person, because it's static method
        this.templateFunc = func;
    }

}