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
router.post('/:appUserId/:org/:channelName/:chaincodeName', postSldc)
router.get('/:appUserId/:org/:channelName/:chaincodeName', getAllSldcs)
router.get('/:name/:appUserId/:org/:channelName/:chaincodeName', getSldcbyName)
router.put('/:sldcId/:appUserId/:org/:channelName/:chaincodeName', updateSldc)
router.delete('/:sldcId', deleteSldc),


module.exports = router