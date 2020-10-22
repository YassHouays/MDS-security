const router = require('express').Router();

/**
* Page de connexion
*/
router.get('/', async function(req, res) {
	res.render('index', {
		logged: req.logged,
		options: {
			body: 'auth/login.ejs',
			current_page: 'login',
			base_url: process.env.BASE_URL,
		}
	});
});



/**
* Process POST de connexion
*/
router.post('/',  async function(req, res) {
	let error_status, error_message;

	if(req.body.email !== '' && req.body.email && req.body.password !== '' && req.body.password){
		let {email, password} = req.body
		let request = await req.Auth.login(email, password);

		if(request){
			if(req.body.keep_logged == 'on'){
				res.cookie('logged', true, {maxAge: Date.now() + (10 * 365 * 24 * 60 * 60)});
				res.cookie('token', request, {maxAge: Date.now() + (10 * 365 * 24 * 60 * 60)});
			}

			let sess = req.session;
			sess.email = email;
			sess.password = password;
			sess.logged = true;
			
			res.redirect('/');
		}else{
			error_status = true;
			error_message = 'Identifiant incorrect';
		}
		
	}else{
		error_status = true;
		error_message = 'Vous devez remplir tout les champs';
	}

	/**
	 * Render de la vue
	 * @render response
	 */
	res.render('index', {
		logged: req.logged,
		response: {
			error: error_status,
			message: error_message,
		},
		options: {
			body: 'auth/login.ejs',
			current_page: 'login',
			base_url: process.env.BASE_URL,
		}
	});
	
});

module.exports = router;
