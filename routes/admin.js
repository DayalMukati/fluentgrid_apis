const {
    getAdminById,
    enrollAdmin,
    registerUser
} = require('../controller/admin.js')

const router = require('express').Router()

router.param('org', enrollAdmin);
router.param('orgName', registerUser);

//standard get & post
router.post('/admin/:org', enrollAdmin)
router.post('/user/:orgName', registerUser),


module.exports = router