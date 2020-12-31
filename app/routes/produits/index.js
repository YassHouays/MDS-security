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
* Page produits
*/
router.get('/', async function(req, res) {
	let produits = await Product.getProducts()
	// console.log('slt');
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
	// console.log('youhou');
	res.render('index', {
		logged: req.logged,
		my_data : req.my_data,
		notifications: req.my_notifications,
		options: {
			body: 'produits/creation.ejs',
			current_page: 'creations',
			base_url: process.env.BASE_URL,
		},
	});
});

	router.get('/:name', async function(req, res) {
		let name = req.params.name
		let produits = await Product.getProductsBySlug(name)
		// console.log(name);
		// console.log(produits);
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


router.post('/creation', async function(req, res) {
	let request = await Product.createProduct(req.body)
	res.redirect('/produits');
});
router.post('/:name', async function(req, res) {
	let name = req.params.name
	let request = await Product.deleteProduct(req.body,name)
	res.redirect('/produits');
});


module.exports = router;