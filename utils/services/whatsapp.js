require('dotenv').config()
const axios = require('axios').default //bash: npm install request

/**
 * send whatsapp message to users
 * @param {{phone: string,body:string}} data  give phone and string
 * @returns success or failure messages
 */
exports.sendWhatsAppMessage = async data => {
	try {
		const token = process.env.WHATSAPP_API_TOKEN
		const instanceId = process.env.WHATSAPP_API_INSTANCE
		const url = `https://api.chat-api.com/instance${instanceId}/message?token=${token}`

		const res = await axios({ method: 'post', url: url, data: data })

		return [res.data, null]
	} catch (error) {
		console.log({ wpAPI: error })
		return [null, error]
	}
}
