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
	getAdjust,
	postCharges,
	getCharges,
	postMeter,
	getMeter
} = require('../controller/consumer.js')

const router = require('express').Router()

router.param('name', getConsumerbyName);
//router.param('accountNo', getConsumerById)
//standard get & post
router.post('/', postConsumer)
router.post('/bill', dailyBill)
router.post('/recharge', createRecharge)
router.post('/adjust', createAdjust)
router.get('/', getAllConsumers)
router.get('/name', getConsumerbyName)
router.get('/bill', getBill)
router.get('/recharge', getRecharge)
router.get('/adjust', getAdjust)
router.put('/', updateConsumer)
router.put('/pack', updatePack)
router.put('/monthly', updateMonthly)
router.put('/wallet', updateWallet)
router.delete('/', deleteConsumer),

router.post('/charges', postCharges)
router.get('/charges', getCharges)

router.post('/meter', postMeter)
router.get('/meter', getMeter)


module.exports = router