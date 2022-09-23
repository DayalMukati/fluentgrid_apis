const {
	getConsumerById,
	getAllConsumers,
	getConsumer,
	postConsumer,
	deleteConsumer,
	updateConsumer
} = require('../controller/consumer.js')

const router = require('express').Router()

//standard get & post
router.post('/', postConsumer)
router.get('/', getAllConsumers)
router.get('/:ConsumerId', getConsumer)
router.put('/:ConsumerId', updateConsumer)
router.delete('/:ConsumerId', deleteConsumer)


module.exports = router