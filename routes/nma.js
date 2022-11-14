const {
	getNmaById,
	getAllNmas,
	postNma,
	deleteNma,
	updateNma,
	getNmabyName
} = require('../controller/nma.js')

const router = require('express').Router()

router.param('name', getNmabyName);
router.param('nmaId', getNmaById)
//standard get & post
router.post('/', postNma)
router.get('/', getAllNmas)
router.get('/name', getNmabyName)
router.put('/', updateNma)
router.delete('/:nmaId', deleteNma),


	module.exports = router