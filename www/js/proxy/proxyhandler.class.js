class ProxyHandler {

    static get(targetObj, propName) {
        return Reflect.get(targetObj, propName);
    }

    static set(targetObj, propName, val) {
        console.log("PROXYHANDLER SET: " + propName + " / " + val);
        let oldVal = Reflect.get(targetObj, propName);
        //
        targetObj.listMakeChanges ? targetObj.listMakeChanges(propName, val, oldVal) : undefined;
        //
        let watch = targetObj.callWatchers ? targetObj.callWatchers(propName, val, oldVal) : true;
        //
        if (!watch) {
            return false;
        }
        let ret = Reflect.set(targetObj, propName, val);
         targetObj.displayUpdate ? targetObj.displayUpdate() : undefined;
        //
        return ret;
    }

    static deleteProperty(targetObj, propName, val) {
//        console.log("PROXYHANDLER DELETE: " + propName + " / " + val);
        let oldVal = Reflect.get(targetObj, propName);
        //
        let watch = targetObj.callWatchers ? targetObj.callWatchers(propName, undefined, oldVal) : true;
        //
        if (!watch) {
            return false;
        }
        let ret = Reflect.deleteProperty(targetObj, propName, val);
        //
        targetObj.displayUpdate ? targetObj.displayUpdate() : undefined;
        //
        return ret;
    }
}