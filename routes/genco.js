const {
    getGencoById,
	getAllGencos,
	postGenco,
	deleteGenco,
	updateGenco,
    getGencobyName
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


module.exports = router