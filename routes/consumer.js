const {
    getConsumerById,
	getAllConsumers,
	postConsumer,
	deleteConsumer,
	updateConsumer,
	updateMonthly,
    getConsumerbyName,
	updateWallet
} = require('../controller/consumer.js')

const router = require('express').Router()

router.param('name', getConsumerbyName);
router.param('accountNo', getConsumerById)
//standard get & post
router.post('/:appUserId/:org/:channelName/:chaincodeName', postConsumer)
router.get('/:appUserId/:org/:channelName/:chaincodeName', getAllConsumers)
router.get('/:accountNo/:appUserId/:org/:channelName/:chaincodeName', getConsumerbyName)
router.put('/:accountNo/:appUserId/:org/:channelName/:chaincodeName', updateConsumer)
router.put('/monthly/:accountNo/:appuserId/:org/:channelName/:chaincodeName', updateMonthly)
router.put('/wallet/:accountNo/:appuserId/:org/:channelName/:chaincodeName', updateWallet)
router.delete('/:accountNo', deleteConsumer),


module.exports = router