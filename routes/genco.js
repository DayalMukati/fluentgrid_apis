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
router.post('/', postGenco)
router.get('/', getAllGencos)
router.get('/:name', getGencobyName)
router.put('/:gencoId', updateGenco)
router.delete('/:gencoId', deleteGenco),


module.exports = router