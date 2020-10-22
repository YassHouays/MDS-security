const router = require('express').Router();
const Course = new (require('../../model/Course'))()

/**
* Page d'accueil des cours
*/
router.get('/', async function(req, res) {
	let category = await Course.getCategory()
	let courses = await Course.getCourses()


	res.render('index', {
		logged: req.logged,
		notifications: req.my_notifications,
		options: {
			body: 'courses/index.ejs',
			current_page: 'courses',
			base_url: process.env.BASE_URL,
		},
		data: {
			category, courses
		}
	});
});


/**
* Page d'un cours
*/
router.get('/:course', async function (req, res) {
	let ref = req.params.course
  
	res.render('index', {
		logged: req.logged,
		my_data: req.my_data,
		notifications: req.my_notifications,
		options: {
			body: 'courses/course.ejs',
			current_page: 'courses',
			base_url: process.env.BASE_URL,
		},
		data: {
			course: ref
		}
	});
})

module.exports = router;