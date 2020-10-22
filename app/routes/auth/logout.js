const router = require('express').Router();

/**
* Process de déconnexion
*/
router.get('/', function (req, res) {
	res.cookie('logged', 'null', {maxAge: 0});
	res.clearCookie('logged');
	res.cookie('email', 'null', {maxAge: 0});
	res.clearCookie('email');
	res.cookie('password', 'null', {maxAge: 0});
	res.clearCookie('password');
	res.redirect('/login');
})

module.exports = router;
