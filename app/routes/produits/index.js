const router = require('express').Router();
const Course = new (require('../../model/Produit'))()

/**
* Page d'accueil des produits
*/
router.get('/', async function(req, res) {
	let produits = await Course.getProducts()


	res.render('index', {
		logged: req.logged,
		notifications: req.my_notifications,
		options: {
			body: 'produits/index.ejs',
			current_page: 'produits',
			base_url: process.env.BASE_URL,
		},
		data: {
		 produits
		}
	});
});

router.get('/creation', async function(req, res) {

	res.render('index', {
		logged: req.logged,
		notifications: req.my_notifications,
		options: {
			body: 'produits/creation.ejs',
			current_page: 'produits',
			base_url: process.env.BASE_URL,
		},
	});
});


module.exports = router;