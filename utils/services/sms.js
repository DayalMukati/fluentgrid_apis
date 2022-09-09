require('dotenv').config()

const axios = require('axios')

/**
 * send whatsapp message to users
 * @param {number} number receiver number
 * @param {string} msg  message to send
 * @returns success or failure messages
 */
exports.sendSMS = async (number, msg) => {
	try {
		if (!parseInt(number) && !msg)
			throw new Error('Invalid Params unable to send an sms')

		const params = new URLSearchParams({
			apikey: process.env.TEXT_LOCAL_API_KEY,
			numbers: parseInt(number),
			message: encodeURIComponent(msg),
			sender: 'BKS',
		})

		const url = `https://api.textlocal.in/send/?${params}`

		const res = await axios({ method: 'post', url: url })

		return [res.data, null]
	} catch (error) {
		console.log({ wpAPI: error })
		return [null, error]
	}
}
