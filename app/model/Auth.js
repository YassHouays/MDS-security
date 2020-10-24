const qs = require('querystring');
const sha256 = require('sha256');

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
     * Inscrit un client
     * @param {String} email
     * @param {String} password
     * @return {Boolean}
     */
    async register(firstname, lastname, username, email, password) {
        const sha_pass = sha256( password );
        return axios_instance.post('signup/', {"email": email, "password": sha_pass})
            .then((response) => true)
            .catch((error) => false);
    }

        /**
     * Check si l'email donné existe déjà
     * @param {String} email 
     * @return {Boolean - Response}
     */
    async mailExist(email) {
        return axios_instance.post('search/', {"endpoint": "user", "find_by": "email", "query": email})
            .then((response) => (response.data.data.is_exist) ? response.data.data.content : false)
            .catch((error) => false);
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