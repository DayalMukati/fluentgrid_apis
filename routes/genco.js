const { postOutage, getOutage } = require('../controller/common.js');
const {
    getGencoById,
	getAllGencos,
	postGenco,
	deleteGenco,
	updateGenco,
    getGencobyName,
	postLosses,
	postOutage,
	getLosses,
	getOutage
} = require('../controller/genco.js')

const router = require('express').Router()

router.param('name', getGencobyName);
router.param('gencoId', getGencoById)
//standard get & post
router.post('/:appUserId/:org/:channelName/:chaincodeName', postGenco)
router.get('/:appUserId/:org/:channelName/:chaincodeName', getAllGencos)
router.get('/:name/:appUserId/:org/:channelName/:chaincodeName', getGencobyName)
router.put('/:gencoId/:appUserId/:org/:channelName/:chaincodeName', updateGenco)
router.delete('/:gencoId', deleteGenco),

router.post('/lossesconf/:appUserId/:org/:channelName/:chaincodeName', postLosses)
router.get('/lossesconf/:appUserId/:org/:channelName/:chaincodeName', getLosses)

router.post('/outages/:appUserId/:org/:channelName/:chaincodeName', postOutage)
router.get('/outages/:appUserId/:org/:channelName/:chaincodeName', getOutage)


module.exports = router