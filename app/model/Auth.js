const qs = require('querystring');

/**
 * Init de axios et création d'une instance
 */
const axios = require('axios');
const axios_instance = axios.create({ 
    baseURL: process.env.API_URI,
    headers: {'x-access-token': process.env.ACCESS_TOKEN
}});
console.log(process.env.API_URI)


/**
 * Class gérant l'authentification
 */
class Auth {

    /**
     * Check si le client est connecté
     * @param {Object} req 
     * @return {Boolean}
     */
    async isLogged(req) {
        if(req.session.logged || req.cookies.logged) return true;
        return false
    }


    /**
     * Connecte un client
     * @param {String} email
     * @param {String} password
     * @return {Boolean}
     */
    async login(email, password) {
        const requestBody = {
            email: email,
            password: password
        }

        const requestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        return axios.post(`http://localhost:3031/login`, qs.stringify(requestBody), requestConfig)
            .then((response) => response.data.token)
            .catch((error) => false);
    }

    
}

module.exports = Auth;