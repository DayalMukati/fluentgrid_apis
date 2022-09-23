const {
	getNMAById,
	getAllNMAs,
	postNMA,
	deleteNMA,
	updateNMA
} = require('../controller/nma.js')

const router = require('express').Router()

//standard get & post
router.post('/', postNMA)
router.get('/', getAllNMAs)
router.get('/:NMAId', getNMAById)
router.put('/:NMAId', updateNMA)
router.delete('/:NMAId', deleteNMA)


module.exports = router