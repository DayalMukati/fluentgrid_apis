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
router.post('/', postCtu)
router.get('/', getAllCtus)
router.get('/:name', getCtubyName)
router.put('/:ctuId', updateCtu)
router.delete('/:ctuId', deleteCtu),


module.exports = router