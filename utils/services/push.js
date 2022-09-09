const { admin } = require('../../config/firebase')

/**
 * send push notification to users
 * @param {string} registrationToken device token for registration
 * @param {{title:string , content:string}} data notification data
 * @returns [response , error]
 */
exports.send_notification_to_user = async (registrationToken, data) => {
	try {
		const notification_options_high_priority = {
			priority: 'high',
			timeToLive: 60 * 60 * 24,
		}

		if (!req.body.title && !req.body.content) {
			throw new Error('please give correct inputs')
		}
		const message = {
			notification: {
				title: data.title,
				body: data.content,
			},
		}
		const options = notification_options_high_priority

		const response = await admin
			.messaging()
			.sendToDevice(registrationToken, message, options)

		return [response, null]
	} catch (error) {
		return [null, error]
	}
}
