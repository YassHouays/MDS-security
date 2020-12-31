/**
* Init de axios et création d'une instance
*/
const axios = require('axios');
const axios_instance = axios.create({ 
   baseURL: process.env.API_URI,
   headers: {'token': process.env.ACCESS_TOKEN}
});



/**
* Class gérant les produits
*/
class Product {


    async getProducts() {
        return axios_instance.post('product/search')
            .then((response) => (response.data) ? (response.data) : false)
            .catch((error) => false);
    }
    async getProductsBySlug(name) {
        return axios_instance.get(`product/show/${name}`)
            .then((response) => (response.data) ? (response.data) : false)
            .catch((error) => false);
    }

        /**
     * Créer un cours
     * @param {String} body
     * @return {Boolean - Response}
     */
    async createProduct(body) {
        return axios_instance.post('product/create', {name: body.title, cover: body.url, description: body.description})
            .then((response) => (response.data.data) ? response.data.data : false)
            .catch((error) => console.log(error) && false);
    }

    async deleteProduct(body,name) {
        console.log(name)
        return axios_instance.delete(`product/delete/${name}`)
            .then((response) => (response.data.data) ? response.data.data : false)
            .catch((error) => console.log(error) && false);
    }

}

module.exports = Product;