const {
	postOutage,
	getOutage
} = require('../controller/common.js');
const {
	getGencoById,
	getAllGencos,
	postGenco,
	deleteGenco,
	updateGenco,
	getGencobyName,
	postLosses,
	postgencoOutage,
	getLosses,
	getgencoOutage
} = require('../controller/genco.js')

const router = require('express').Router()

// router.param('name', getGencobyName);
// router.param('gencoId', getGencoById)
//standard get & post
router.post('/', postGenco)
router.get('/', getAllGencos)
router.get('/name', getGencobyName)
router.put('/', updateGenco)
router.delete('/', deleteGenco)

router.post('/lossesconf', postLosses)
router.get('/lossesconf', getLosses)

router.post('/outages', postgencoOutage)
router.get('/outages', getgencoOutage)


module.exports = router