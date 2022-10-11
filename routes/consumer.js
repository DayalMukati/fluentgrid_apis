const {
    getConsumerById,
	getAllConsumers,
	postConsumer,
	deleteConsumer,
	updateConsumer,
	updateMonthly,
    getConsumerbyName,
	updateWallet,
	updatePack,
	dailyBill
} = require('../controller/consumer.js')

const router = require('express').Router()

router.param('name', getConsumerbyName);
//router.param('accountNo', getConsumerById)
//standard get & post
router.post('/:appUserId/:org/:channelName/:chaincodeName', postConsumer)
router.post('/billing/:appUserId/:org/:channelName/:chaincodeName', dailyBill)
router.get('/:appUserId/:org/:channelName/:chaincodeName', getAllConsumers)
router.get('/:name/:appUserId/:org/:channelName/:chaincodeName', getConsumerbyName)
router.get('/:accountNo/:appUserId/:org/:channelName/:chaincodeName', getBill)
router.put('/:accountNo/:appUserId/:org/:channelName/:chaincodeName', updateConsumer)
router.put('/pack/:accountNo/:appUserId/:org/:channelName/:chaincodeName', updatePack)
router.put('/monthly/:accountNo/:appuserId/:org/:channelName/:chaincodeName', updateMonthly)
router.put('/wallet/:accountNo/:appuserId/:org/:channelName/:chaincodeName', updateWallet)
router.delete('/:accountNo/:appuserId/:org/:channelName/:chaincodeName', deleteConsumer),


module.exports = router