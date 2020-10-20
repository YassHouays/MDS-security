# MDS-security

# Project 
The objectives of this project are to integrate security into a specific microservices architecture. You have to understand the interest of securing your own architecture
```Architecture```
```Information sur le projet```
```Execution du projet en local```
```Sécurisation du projet```


### INSTALLATION
Download this project with git clone : ``` git clone https://github.com/YassHouays/MDS-security.git``` </Br>
And install it with ```npm install```
<!-- 
You have to create a .env file with a variable ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxx and put you'r token in you'r postman collection without this token you will not be able to use the API.

```start the project with nodemon or npm run start```


This example explains how to configure this API. -->

### USER CRUD API

In this example a simple imaginary CRUD API is used for demonstrating the configuration of the USER API. The CRUD API has five operations that accept and return JSON:

* list all users
  * ``` [POST]  http://localhost:3000/user/search```
* list one user 
  * ``` [GET]  http://localhost:3000/user/show/:id```
* create an user 
  * ``` [POST]  http://localhost:3000/user/create```
* update user
  * ``` [PUT]  http://localhost:3000/user/update/:id```
* delete user
  * ``` [DELETE]  http://localhost:3000/user/delete/:id```

A user object has many properties: ```id``` , ```first_name```, ```last_name```, ```username```, ```email```, ```password```, ```age```, ```city```, ```city_code```, ```street_number```, ```street_type```, ```street_name```, ```phone```.

```javascript
{
  "first_name":"Prenom",
  "last_name":"Nom",
  "username":"Yass",
  "email":"test@gmail.com",
  "password":"xxxx",
  "age":"22",
  "city":"Paris",
  "city_code":"75",
  "street_number":"11",
  "street_type":"rue",
  "street_name":"cambrai",
  "phone":"0651299959"
}
```

### EVENT CRUD API

In this example a simple imaginary CRUD API is used for demonstrating the configuration of the EVENT API. The CRUD API has five operations that accept and return JSON:

* list all events
  * ``` [POST]  http://localhost:3000/event/search```
* list one event 
  * ``` [GET]  http://localhost:3000/event/show/:id```
* create an event 
  * ``` [POST]  http://localhost:3000/event/create```
* update event
  * ``` [PUT]  http://localhost:3000/event/update/:id```
* delete event
  * ``` [DELETE]  http://localhost:3000/event/delete/:id```

An event object has many properties: ```id``` , ```administrator```, ```name```, ```description```, ```date_start```, ```date_end```, ```location```, ```longitude```, ```latitude```, ```status```, ```staff```, ```members```.

```javascript
{
  "administrator":"id",
  "name":"Yassine",
  "description":"Soirée barbecue",
  "date_start":"2020-02-10",
  "date_end":"2020-03-10",
  "location":{
    "longitude":45,
    "latitude":42
    },
  "status":0,
  "staff":"id",
  "members":"id"
}
```

