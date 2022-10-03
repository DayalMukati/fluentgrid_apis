const {
    getCtuById,
	getAllCtus,
	postCtu,
	deleteCtu,
	updateCtu,
    getCtubyName
} = require('../controller/ctu.js')

const router = require('express').Router()

router.param('name', getCtubyName);
router.param('ctuId', getCtuById)
//standard get & post
router.post('/:appUserId/:org/:channelName/:chaincodeName', postCtu)
router.get('/:appUserId/:org/:channelName/:chaincodeName', getAllCtus)
router.get('/:name/:appUserId/:org/:channelName/:chaincodeName', getCtubyName)
router.put('/:ctuId/:appUserId/:org/:channelName/:chaincodeName', updateCtu)
router.delete('/:ctuId', deleteCtu),


module.exports = router