class GenericEventHandler {
    constructor() {

        if (GenericEventHandler.once) {
            throw(new Error("GenericEventHandler is a singleton"));
        }

        GenericEventHandler.once = true;

        this.addEventHandler();

    }

    addEventHandler() {

        $(document).on(
                'click mousemove mouseenter mouseleave ' +
                'keydown keyup keypress submit',
                '*',
                function (e) {
                    let el = $(this);
                    let type = e.type;
                    let methodToRun = el.attr('data-' + type);
                    if (methodToRun) {
                        let baseEl = el.closest('[data-instance-id]');
                        if (baseEl) {
                            let instanceId = baseEl.attr('data-instance-id');
                            //Base.mem - base.class.js
                            let obj = Base.mem[instanceId];
                            obj[methodToRun]();
                        }
                    }
                }
        );

    }

}