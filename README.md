# MDS-security
<!-- https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport -->
# Project 
The objectives of this project are to integrate security into a specific microservices architecture. You have to understand the interest of securing your own architecture
```Architecture```
```Information sur le projet```
```Execution du projet en local```
```Sécurisation du projet```


### INSTALLATION
Download this project with git clone : ``` git clone https://github.com/YassHouays/MDS-security.git``` </Br>

In the folder 'api', you have to create a '.env' file with this configuration and your local mongo : 
  - NOSQL_HOST=xxxxxxxxxxxxxxxxxxx </br>
    NOSQL_TABLE=xxxxxxxxxx</br>
    NOSQL_PWD=xxxxxxx</br>
    NOSQL_USER=xxxxxxx</br>

    BASE_URL=http://localhost:3031/</br>
    SERVER_PORT=3031</br>
    ACCESS_TOKEN=xxxxxxxxxxxxxxxx
    
    </br></br>
    
In the folder 'app', you have to create a '.env' file with this configuration and your local mongo : 
  - BASE_URL=http://localhost:3020/ </br>
    SERVER_PORT=3020</br>
    API_URI=http://localhost:3000/</br>
    AUTH_API_URI=http://localhost:3031/</br>
    ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx</br>
    BASE_URL=http://localhost:3031/</br>
    SERVER_PORT=3031</br>
    ACCESS_TOKEN=xxxxxxxxxxxxxxxx
 
In the folder 'auth-api', you have to create a '.env' file with this configuration and your local mongo : 
  - NOSQL_HOST=xxxxxxxxxxxxxxxxxxx </br>
    NOSQL_TABLE=xxxxxxxxxx</br>
    NOSQL_PWD=xxxxxxx</br>
    NOSQL_USER=xxxxxxx</br>
    
    BASE_URL=http://localhost:3031/</br>
    SERVER_PORT=3031</br>
    ACCESS_TOKEN=xxxxxxxxxxxxxxxx
    
Do an install in each folder (api, app and auth-api) with ```npm install```

Add some datas in postman with this Post endpoint : ```http://localhost:3000/product/create``` </br>
Here some exemple : </br>
    ```{
        "cover": "https://cdn.mgig.fr/2020/10/mg-15b8e255-w750.jpg",
        "name": "Iphone 12",
        "description": "Le meilleur appareil photo possible",
    }```
    </br>
    ```{
        "cover": "https://images.frandroid.com/wp-content/uploads/2019/12/apple-macbook-pro-16.jpg",
        "name": "Nouveau macbook Pro 16 pouces",
        "description": "Un nouveau macbook encore plus gros "
    }```
    </br>
    ```{
        "cover": "https://45secondes.fr/wp-content/uploads/2020/09/1600194724_656_Apple-a-devoile-les-iPad-de-nouvelle-generation-et-le.jpg",
        "name": "Ipad écran rétina",
        "description": "de nouveaux coloris"
    }```
    </br>
    ```{
     "cover": "https://www.presse-citron.net/wordpress_prod/wp-content/uploads/2019/10/apple-airpods-pro-1.jpg",
        "name": "airpods Pro",
        "description": "air pods pro de dernière génération",
    }```
 </br>
 </br>
 
 You also need to create an User in postman with this endpoint : ```http://localhost:3031/signup}``` add in x-www-form-urlencoded
 an email and a password
 
 After all this installation you are good to use the app 

 ### Installation with docker
 
And start it with docker-compose up --build

You will find one DockerFile in the backend of the project and one on the Frontend In the main repository a Docker-compose , ready to start everything.

 ### Security with TLS
 
All the api and app are securised with TLS you can find  a folder ```Config``` with a key and a certificat for each api and acces it with this url : </br> 
API : https://localhost:8082/ </br>
APP : https://localhost:8080/ </br>
AUTH-API : https://localhost:8081/ </br>


the auth-api is secured with JWT (https://www.npmjs.com/package/jsonwebtoken) and use a token who expires in 10h and use an algorithm HS256

