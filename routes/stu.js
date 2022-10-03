const {
    getStuById,
	getAllStus,
	postStu,
	deleteStu,
	updateStu,
    getStubyName
} = require('../controller/stu.js')

const router = require('express').Router()

router.param('name', getStubyName);
router.param('stuId', getStuById)
//standard get & post
router.post('/:appUserId/:org/:channelName/:chaincodeName', postStu)
router.get('/:appUserId/:org/:channelName/:chaincodeName', getAllStus)
router.get('/:name/:appUserId/:org/:channelName/:chaincodeName', getStubyName)
router.put('/:stuId/:appUserId/:org/:channelName/:chaincodeName', updateStu)
router.delete('/:stuId', deleteStu),


module.exports = router