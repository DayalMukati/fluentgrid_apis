var admin = require('firebase-admin')

var serviceAccount = require('../bks-firebase.json')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
})

module.exports.admin = admin
