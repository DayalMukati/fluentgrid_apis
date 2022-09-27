const {
	getctuById,
	getAllctus,
	getctu,
	postctu,
	deletectu,
	updatectu
} = require('../controller/ctu.js')

const router = require('express').Router()

//standard get & post
router.post('/', postctu)
router.get('/', getAllctus)
router.get('/:ctuId', getctu)
router.put('/:ctuId', updatectu)
router.delete('/:ctuId', deletectu)


module.exports = router