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
router.post('/:appUserId/:org/:channelName/:chaincodeName', postNma)
router.get('/:appUserId/:org/:channelName/:chaincodeName', getAllNmas)
router.get('/:name/:appUserId/:org/:channelName/:chaincodeName', getNmabyName)
router.put('/:nmaId/:appUserId/:org/:channelName/:chaincodeName', updateNma)
router.delete('/:nmaId', deleteNma),


module.exports = router