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
	dailyBill,
	getBill,
	createRecharge,
	getRecharge,
	createAdjust,
	getAdjust
} = require('../controller/consumer.js')

const router = require('express').Router()

router.param('name', getConsumerbyName);
//router.param('accountNo', getConsumerById)
//standard get & post
router.post('/:appUserId/:org/:channelName/:chaincodeName', postConsumer)
router.post('/bill/:accountNo/:appUserId/:org/:channelName/:chaincodeName', dailyBill)
router.post('/recharge/:accountNo/:appUserId/:org/:channelName/:chaincodeName', createRecharge)
router.post('/adjust/:accountNo/:appUserId/:org/:channelName/:chaincodeName', createAdjust)
router.get('/:appUserId/:org/:channelName/:chaincodeName', getAllConsumers)
router.get('/:name/:appUserId/:org/:channelName/:chaincodeName', getConsumerbyName)
router.get('/bill/:accountNo/:appUserId/:org/:channelName/:chaincodeName', getBill)
router.get('/recharge/:accountNo/:appUserId/:org/:channelName/:chaincodeName', getRecharge)
router.get('/adjust/:accountNo/:appUserId/:org/:channelName/:chaincodeName', getAdjust)
router.put('/:accountNo/:appUserId/:org/:channelName/:chaincodeName', updateConsumer)
router.put('/pack/:accountNo/:appUserId/:org/:channelName/:chaincodeName', updatePack)
router.put('/monthly/:accountNo/:appuserId/:org/:channelName/:chaincodeName', updateMonthly)
router.put('/wallet/:accountNo/:appuserId/:org/:channelName/:chaincodeName', updateWallet)
router.delete('/:accountNo/:appuserId/:org/:channelName/:chaincodeName', deleteConsumer),


module.exports = router