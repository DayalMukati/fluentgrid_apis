const {
   postLosscharge,
   getLosscharge,
   postOutage,
   getOutage,
   postWallet,
   getWallet,
   postDSM1,
   getDSM1,
   getDSM2,
   postDSM2,
   calculateBill,
   calculationCron
} = require('../controller/common.js')

const router = require('express').Router()
//standard get & post
router.post('/losscharge', postLosscharge)
router.get('/losscharge', getLosscharge)

router.post('/outage', postOutage)
router.get('/outage', getOutage)

router.post('/wallet', postWallet)
router.get('/wallet', getWallet)

router.post('/dsm1', postDSM1)
router.get('/dsm1', getDSM1)

router.post('/dsm2', postDSM2)
router.get('/dsm2', getDSM2)

router.post('/calculateBill', calculationCron)
module.exports = router