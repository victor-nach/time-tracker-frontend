class Auth {
    constructor() {
        this.authenthicated = false
    }

    login(cb) {
        this.authenthicated = true
        cb()
    }

    logout(cb) {
        this.authenthicated = false
        cb()
    }

    isAuthenticated(cb) {
        return this.authenthicated 
       
    }
}

export default new Auth()
