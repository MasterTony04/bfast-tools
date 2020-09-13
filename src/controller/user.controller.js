const BFastJs = require("../bfast.cli");

class UserController {

    /**
     *
     * @param restController {RestController}
     */
    constructor(restController) {
        this.restController = restController;
    }

    async login(email, password) {
        return await this.restController.post(`${await BFastJs.clusterApiUrl()}/users/login`, {
            email: email,
            password: password
        }, {
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    async logout(token) {
        return await this.restController.post(`${await BFastJs.clusterApiUrl()}/users/logout`, {
            token: token
        }, {
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });
    }
}

module.exports = UserController;
