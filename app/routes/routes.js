const router = require('express').Router();

/**
* Init des routes de l'application
*/
router.use('/', require('./index') );
router.use('/', require('./auth') );
router.use('/cours', require('./cours') );
router.use('/produits', require('./produits') );

/**
* Page d'erreur (404)
*/
router.use(function(req, res){
    res.status(404).render('index', {
		logged: req.logged,
        options: {
            body: '404.ejs',
            current_page: 'error',
			base_url: process.env.BASE_URL,
        }
    });
});
  
module.exports = router;