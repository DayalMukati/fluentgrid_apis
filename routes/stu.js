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
router.post('/', postStu)
router.get('/', getAllStus)
router.get('/name', getStubyName)
router.put('/', updateStu)
router.delete('/', deleteStu)


module.exports = router