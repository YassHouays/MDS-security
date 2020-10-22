const router = require('express').Router();

/**
* Init des routes de l'authentification
*/
router.use('/register', require('./register') );
router.use('/login', require('./login') );
router.use('/logout', require('./logout') );

module.exports = router;
