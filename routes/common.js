const {
   postLosscharge,
   getLosscharge
} = require('../controller/common.js')

const router = require('express').Router()
//standard get & post
router.post('/losscharge/:entity/:appuserId/:org/:channelName/:chaincodeName', postLosscharge)
router.get('losscharge/:entity/:appuserId/:org/:channelName/:chaincodeName', getLosscharge)


module.exports = router