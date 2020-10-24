const router = require('express').Router();
const Product = new (require('../../model/Produit'))()

/**
* Page d'accueil des produits
*/
router.get('/', async function(req, res) {
	let produits = await Product.getProducts()


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

/**
* Page d'un produit
*/
router.get('/produits', async function(req, res) {
	let produits = await Product.getProducts()


	res.render('index', {
		logged: req.logged,
		notifications: req.my_notifications,
		options: {
			body: 'produits/produits.ejs',
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
		my_data : req.my_data,
		notifications: req.my_notifications,
		options: {
			body: 'produits/creation.ejs',
			current_page: 'produits',
			base_url: process.env.BASE_URL,
		},
	});
});


router.post('/creation', async function(req, res) {
	let request = await Product.createProduct(req.body)
	res.redirect('/produits');
});

module.exports = router;