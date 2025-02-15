const router = require('express').Router();

/**
* Page d'inscription
*/
router.get('/', async function(req, res) {
	res.render('index', {
		logged: req.logged,
		options: {
			body: 'auth/register.ejs',
			current_page: 'register',
			base_url: process.env.BASE_URL,
		}
	});
});



/**
* Process POST d'inscription
*/
router.post('/', async function(req, res) {
	console.log('je suis la')
	let error_status, error_message;

	if(req.body.accept_cgu !== '' && req.body.accept_cgu){
		if(req.body.email !== '' && req.body.email && req.body.password !== '' && req.body.password && req.body.confirm_password !== '' && req.body.confirm_password){
			
			let {email, password, confirm_password} = req.body
			console.log(req.body);
			let verifEmail = await req.Auth.mailExist(email);

			if (!verifEmail){
				console.log('email verif')
				if (password == confirm_password){
					console.log(email)
					let request = await req.Auth.register(email, password);
					if(request){
					
							res.redirect('compte');
				
					}else{
						error_status = true;
						error_message = 'Une erreur est survenue';
					}
	
				}else{
					error_status = true;
					error_message = 'Les mots de passe sont différents';
				}
				
			}else{
				error_status = true;
				error_message = 'L\'email existe déjà';
			}
			
		}else{
			error_status = true;
			error_message = 'Vous devez remplir tout les champs';
		}
	}else{
		error_status = true;
		error_message = 'Vous devez accepter nos conditions d\'utilisation';
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
			body: 'auth/register.ejs',
			current_page: 'register',
			base_url: process.env.BASE_URL,
		}
	});

});

module.exports = router;
