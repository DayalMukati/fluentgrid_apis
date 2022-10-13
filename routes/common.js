const {
   postLosscharge,
   getLosscharge,
   postOutage,
   getOutage
} = require('../controller/common.js')

const router = require('express').Router()
//standard get & post
router.post('/losscharge/:entity/:appUserId/:org/:channelName/:chaincodeName', postLosscharge)
router.get('/losscharge/:entity/:appUserId/:org/:channelName/:chaincodeName', getLosscharge)

router.post('/outage/:entity/:appUserId/:org/:channelName/:chaincodeName', postOutage)
router.get('/outage/:entity/:appUserId/:org/:channelName/:chaincodeName', getOutage)
module.exports = router