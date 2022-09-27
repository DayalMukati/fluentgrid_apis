const {
	getgencoById,
	getAllgencos,
	getgenco,
	postgenco,
	deletegenco,
	updategenco
} = require('../controller/genco.js')

const router = require('express').Router()

//standard get & post
router.post('/', postgenco)
router.get('/', getAllgencos)
router.get('/:gencoId', getgenco)
router.put('/:gencoId', updategenco)
router.delete('/:gencoId', deletegenco)


module.exports = router