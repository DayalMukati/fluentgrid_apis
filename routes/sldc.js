const {
	getSldcById,
	getAllSldcs,
	postSldc,
	deleteSldc,
	updateSldc,
	getSldcbyName
} = require('../controller/sldc.js')

const router = require('express').Router()

router.param('name', getSldcbyName);
router.param('sldcId', getSldcById)
//standard get & post
router.post('/', postSldc)
router.get('/', getAllSldcs)
router.get('/name', getSldcbyName)
router.put('/', updateSldc)
router.delete('/', deleteSldc)


module.exports = router