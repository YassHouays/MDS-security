const sha256 = require('sha256');
const fs = require('fs')

/**
* Init de axios et création d'une instance
*/
const axios = require('axios');
const axios_instance = axios.create({ 
   baseURL: process.env.API_URI,
   headers: {'x-access-token': process.env.ACCESS_TOKEN
}});



/**
* Class gérant les clients
*/
class User {

    /**
     * Récupérer les données d'un client par son email
     * @param {String} search_type 
     * @param {String} value 
     * @return {Boolean - Response}
     */
    async getAccountData(search_type, value) {
        if(search_type == "email"){
            return axios_instance.post('search/', {"endpoint": "user", "find_by": "email", "query": value})
                .then((response) => (response.data.data.is_exist) ? response.data.data.content : false)
                .catch((error) => false);
        }else if(search_type == "username"){
            return axios_instance.post('search/', {"endpoint": "user", "find_by": "username", "query": value})
                .then((response) => (response.data.data.is_exist) ? response.data.data.content : false)
                .catch((error) => false);
        }

        return false
    }
    


    /**
     * Editer les données d'un client
     * @param {JSON} data 
     * @param {String} type 
     * @param {JSON} actual_data 
     * @return {Boolean - Response}
     */
    async edit(data, type, actual_data) {
        data = JSON.parse(data);

        if(type == 'save_personal_data'){
            let request = {};
            let response_errors = {};

            if(data.first_name && data.first_name !== ''){
                request['first_name'] = data.first_name
            }else{
                request['first_name'] = actual_data.first_name
                response_errors['first_name'] = {
                    "message": "Prénom invalide"
                }
            }
            if(data.last_name && data.last_name !== ''){
                request['last_name'] = data.last_name
                
            }else{
                request['last_name'] = actual_data.last_name
                response_errors['last_name'] = {
                    "message": "Nom de famille invalide"
                }
            }
            if(data.username && data.username !== ''){
                request['username'] = data.username
                
            }else{
                request['username'] = actual_data.username
                response_errors['username'] = {
                    "message": "Pseudo invalide"
                }
            }
    
            if(data.birthday){
                let regEx = /^\d{2}\/\d{2}\/\d{4}$/;
                if(data.birthday.match(regEx) == null){
                    request['birthday'] = actual_data.birthday
                    response_errors['birthday'] = {
                        "message": "Mauvais format de date DD/MM/YYYY"
                    }
                }else{
                    request['birthday'] = data.birthday
                }
            }else{
                request['birthday'] = ''
            }
            
            if(data.tel){
                let regEx = /^[0][1-9]\d{8}$/;
                if(data.tel.match(regEx) == null){
                    request['tel'] = actual_data.tel
                    response_errors['tel'] = {
                        "message": "Nombre de chiffre incorrect"
                    }
                }else{
                    request['tel'] = data.tel
                }
            }else{
                request['tel'] = ''
            }
    
            if(data.city){
                request['city'] = data.city
            }else{
                request['city'] = ''
            }

            if(data.zip_code){
                request['zip_code'] = data.zip_code
            }else{
                request['zip_code'] = ''
            }

            if(data.adress){
                request['adress'] = data.adress
            }else{
                request['adress'] = ''
            }
            
            if(Object.keys(response_errors).length == 0){
                request['date_modified'] = Date.now();
                let send_request = JSON.stringify(request);
                
                return axios_instance.put(`users/${actual_data.id}/update`, {"first_name": request['first_name'], "last_name": request['last_name'], "username": request['username'], "birthday": request['birthday'], "tel": request['tel'], "city": request['city'], "zip_code": request['zip_code'], "adress": request['adress'], "date_modified": Date.now()})
                    .then((response) => true)
                    .catch((error) => false);
            }else{
                return response_errors
            }
           
        }else if(type == 'save_password'){
            let response_errors = {};            
            if(data.password && data.password !== '' && data.confirm_password && data.confirm_password !== ''){
                if(data.password == data.confirm_password){
                    const sha_pass = sha256( data.password );
                    return axios_instance.put(`users/${actual_data.id}/update`, {"password": sha_pass, "date_modified": Date.now()})
                        .then((response) => true)
                        .catch((error) => false);
                }else{
                    response_errors['password'] = {
                        "message": "Les mots de passe sont différent"
                    }
                    return response_errors
                }
            }else{
                response_errors['password'] = {
                    "message": "Champs incorrect"
                }
                return response_errors
            }
        }else if(type == 'reset_medias'){
            let response_errors = {};
            let delete_success = true
            response_errors['image_profile'] = {
                "message": "Une erreur est survenue"
            }
    
            fs.unlink(`./public/assets/doc/users/${actual_data.id}/${actual_data.image_profile}`, (err) => {
                if (err) { delete_success = false}
            })
              
            if(!delete_success){
                return response_errors
            }else{
                return axios_instance.put(`users/${actual_data.id}/update`, {"image_profile": null, "date_modified": Date.now()})
                    .then((response) => true)
                    .catch((error) => response_errors);
            }
        }
    
        return false
    }



    /**
     * Editer les données en post d'un client (pour la gestion des images FILES)
     * @param {Object} req 
     * @param {String} type 
     * @param {JSON} actual_data 
     * @return {Boolean - Response}
     */
    async postedit(req, type, actual_data) {
        if(type == 'save_medias'){
            
            let response_errors = {};
            let upload_success = false
    
            // on fait l'upload
            if (!req.files || Object.keys(req.files.profil_pic).length === 0) {
                response_errors['image_profile'] = {
                    "message": "Erreur pendant l'importation"
                }
            }else{
                let imd = req.files.profil_pic;
                let move = imd.mv(`./public/assets/doc/users/${actual_data.id}/${imd.name}`);
                if(move){
                    upload_success = true
                }else{
                    response_errors['image_profile'] = {
                        "message": "Erreur pendant l'importation"
                    }
                }
            }
    
            // On update la bdd
            if(upload_success){
                let imd = req.files.profil_pic;
                response_errors['image_profile'] = {
                    "message": "Une erreur est survenue (sauvegarde bdd)"
                }
                return axios_instance.put(`users/${actual_data.id}/update`, {"image_profile": imd.name, "date_modified": Date.now()})
                    .then((response) => true)
                    .catch((error) => response_errors);
            }else{
                return response_errors
            }
        }
    
        return false
    }



    /**
     * Demander une suppression de client
     * @param {JSON} actual_data 
     * @return {Boolean - Response}
     */
    async delete(actual_data) {
        let response_errors = [{"message": "Une erreur est survenue"}]

        return axios_instance.put(`users/${actual_data.id}/update`, {"deletion_request": true, "date_deletion_request": Date.now()})
            .then((response) => true)
            .catch((error) => response_errors);
    }



    /**
     * Annuler la suppression de client
     * @param {JSON} actual_data 
     * @return {Boolean - Response}
     */
    async undelete(actual_data) {
        let response_errors = [{"message": "Une erreur est survenue"}]

        return axios_instance.put(`users/${actual_data.id}/update`, {"deletion_request": false, "date_deletion_request": null})
            .then((response) => true)
            .catch((error) => response_errors); 
    }

}

module.exports = User;