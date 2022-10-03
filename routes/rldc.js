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
router.post('/:appUserId/:org/:channelName/:chaincodeName', postRldc)
router.get('/:appUserId/:org/:channelName/:chaincodeName', getAllRldcs)
router.get('/:name/:appUserId/:org/:channelName/:chaincodeName', getRldcbyName)
router.put('/:rldcId/:appUserId/:org/:channelName/:chaincodeName', updateRldc)
router.delete('/:rldcId', deleteRldc),


module.exports = router