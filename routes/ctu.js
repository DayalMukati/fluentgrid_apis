const {
    getCtuById,
	getAllCtus,
	postCtu,
	deleteCtu,
	updateCtu,
    getCtu
} = require('../controller/ctu.js')

const router = require('express').Router()

//standard get & post
router.post('/', postCtu)
router.get('/', getAllCtus)
router.get('/:ctuId', getCtuById)
router.put('/:ctuId', updateCtu)
router.delete('/:ctuId', deleteCtu),
router.get('/:name', getCtu)


module.exports = router