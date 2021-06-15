import store from "store";

class Auth {
    constructor() {
        this.authenthicated = !!store.get("authenthicated")
    }

    login(cb) {
        // set value in local store 
        store.set("authenthicated", true);
        this.authenthicated = true

        cb()
    }

    logout(cb) {
        store.set("authenthicated", false);
        this.authenthicated = false
        cb()
    }

    isAuthenticated(cb) {
        //  get the value from local store
        return store.get("authenthicated");
        // return this.authenthicated 
    }
}

export default new Auth()
