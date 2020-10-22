const router = require('express').Router();
const jwt = require('jsonwebtoken');

/**
* Homepage de l'application
*/
router.get('/', async function(req, res) {
	const jsonwebtoken = req.cookies.token
	console.log(jsonwebtoken);
	if(jsonwebtoken){
		const decode = jwt.verify(jsonwebtoken,'TOP_SECRET')
		console.log(decode)
	}
	res.render('index', {
		logged: req.logged,
		notifications: req.my_notifications,
		options: {
			body: 'home/index.ejs',
			current_page: 'home',
			base_url: process.env.BASE_URL,
		}
	});
});

module.exports = router;
