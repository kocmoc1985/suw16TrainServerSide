class ProxyHandler {

    static get(targetObj, propName) {
        return Reflect.get(targetObj, propName);
    }

    static set(targetObj, propName, val) {
        console.log("SET");
        let ret = Reflect.set(targetObj, propName, val);
        targetObj.displayUpdate();
        return ret;
    }

    static deleteProperty(targetObj, propName, val) {
        console.log("DELETE");
        let ret = Reflect.deleteProperty(targetObj, propName, val);
        targetObj.displayUpdate();
        return ret;
    }
}