require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

/**
 * Send Email
 * @param {string} receiver person to send email
 * @param {string} template template id type
 * @param {{}} personalizationObj personal object
 * @returns
 */
exports.sendEmail = (receiver, template, personalizationObj) => {
	if (!validateEmail(receiver)) {
		return { success: false, msg: 'Invalid email address', status: 400 }
	}
	const msg = {
		to: receiver, // Change to your recipient
		from: process.env.SENDGRID_FROM_EMAIL, // Change to your verified sender
		template_id: template,
		personalizations: [{ ...personalizationObj }],
	}
	sgMail
		.send(msg)
		.then(response => {
			console.log(response[0])
			console.log(response[0])
			return [response[0], null]
		})
		.catch(error => {
			return [null, error]
		})
}

exports.TEMPLATE = {
	APPOINTMENT_FIXED: process.env.SELL_OLD_GOLD_APPOINTMENT_FIXED,
	SELL_OLD_GOLD_REQUEST: process.env.SELL_OLD_GOLD_REQUEST,
	ORDER_DELIVERED: process.env.ORDER_DELIVERED,
	ORDER_ON_THE_WAY: process.env.ORDER_ON_THE_WAY,
	ORDER_PLACED: process.env.ORDER_PLACED,
	SUBSCRIPTION_COMPLETED: process.env.SUBSCRIPTION_COMPLETED,
	SUBSCRIPTION_REMINDER: process.env.SUBSCRIPTION_REMINDER,
	SUBSCRIPTION_TAKEN: process.env.SUBSCRIPTION_TAKEN,
	WALLET_SAVED: process.env.WALLET_SAVED,
	WALLET_SOLD: process.env.WALLET_SOLD,
	REGISTRATION_EMAIL: process.env.REGISTRATION_EMAIL,
	CREATE_INSTALLMENT: process.env.CREATE_INSTALLMENT,
}

function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}
