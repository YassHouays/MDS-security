/**
* Init de axios et création d'une instance
*/
const axios = require('axios');
const axios_instance = axios.create({ 
   baseURL: process.env.API_URI,
   headers: {'x-access-token': process.env.ACCESS_TOKEN
}});



/**
* Class gérant les cours
*/
class Course {

    /**
     * Récupérer les categories de cours
     * @return {Boolean - Response}
     */
    async getCategory() {
        return axios_instance.get('courses_category/')
            .then((response) => (response.data.data) ? response.data.data : false)
            .catch((error) => false);
    }


    /**
     * Récupérer les cours d'une categorie
     * @param {String} category
     * @return {Boolean - Response}
     */
    async getCourses(category = "5ece7cc9d8c6dbbd989fad2f") {
        return axios_instance.get('courses/')
            .then((response) => (response.data.data) ? response.data.data : false)
            .catch((error) => false);
    }


    /**
     * Créer une categorie
     * @param {String} title
     * @return {Boolean - Response}
     */
    async createCategory(title) {
        return axios_instance.post('courses_category/create', {name: title})
            .then((response) => (response.data.data) ? response.data.data : false)
            .catch((error) => console.log(error) && false);
    }


    /**
     * Créer un cours
     * @param {String} body
     * @return {Boolean - Response}
     */
    async createCourse(body) {
        return axios_instance.post('courses/create', {name: body.title, url: body.url, description: body.description, content: body.content, category: body.category, read_duration: body.read_duration})
            .then((response) => (response.data.data) ? response.data.data : false)
            .catch((error) => console.log(error) && false);
    }
    

}

module.exports = Course;