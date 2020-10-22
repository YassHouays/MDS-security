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
class Produit {


    async getProducts() {
        return axios_instance.post('product/search')
            .then((response) => (response.data) ? (response.data) : false)
            .catch((error) => false);
    }

}

module.exports = Produit;