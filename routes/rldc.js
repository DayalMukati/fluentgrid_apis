const {
    getRldcById,
	getAllRldcs,
	postRldc,
	deleteRldc,
	updateRldc,
    getRldcbyName
} = require('../controller/rldc.js')

const router = require('express').Router()

router.param('name', getRldcbyName);
router.param('rldcId', getRldcById)
//standard get & post
router.post('/', postRldc)
router.get('/', getAllRldcs)
router.get('/:name', getRldcbyName)
router.put('/:rldcId', updateRldc)
router.delete('/:rldcId', deleteRldc),


module.exports = router