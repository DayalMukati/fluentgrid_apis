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
   postDSM2
} = require('../controller/common.js')

const router = require('express').Router()
//standard get & post
router.post('/losscharge/:entity/:appUserId/:org/:channelName/:chaincodeName', postLosscharge)
router.get('/losscharge/:entity/:appUserId/:org/:channelName/:chaincodeName', getLosscharge)

router.post('/outage/:entity/:appUserId/:org/:channelName/:chaincodeName', postOutage)
router.get('/outage/:entity/:appUserId/:org/:channelName/:chaincodeName', getOutage)

router.post('/wallet/:appUserId/:org/:channelName/:chaincodeName', postWallet)
router.get('/wallet/:appUserId/:org/:channelName/:chaincodeName', getWallet)

router.post('/dsm1/:appUserId/:org/:channelName/:chaincodeName', postDSM1)
router.get('/dsm1/:appUserId/:org/:channelName/:chaincodeName', getDSM1)

router.post('/dsm2/:appUserId/:org/:channelName/:chaincodeName', postDSM2)
router.get('/dsm2/:appUserId/:org/:channelName/:chaincodeName', getDSM2)
module.exports = router