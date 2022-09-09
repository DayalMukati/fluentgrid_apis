const Subscription = require('../model/subscription');
const { sendEmail, TEMPLATE } = require('../utils/services/emai');
const { send_notification_to_user } = require('../utils/services/push');
const {} = require('../utils/services/sms');
const dateFns = require('date-fns');

exports.check_investments_cron = async function () {
	const subscriptions = Subscription.find({})
		.populate('installments')
		.populate({ path: 'customPlan', populate: 'cyclePeriod' })
		.populate({ path: 'plan', populate: 'cyclePeriod' })
		.populate('user', 'email');

	const current_date = new Date();

	subscriptions.forEach(subscription => {
		let installments = subscription.installments;
		let last_installment_paid = installments[installments.length - 1];
		const cycle = subscription.plan
			? subscription.plan.cyclePeriod.cycle
			: subscription.customPlan.cyclePeriod.cycle;

		const next_due_date = dateFns.addDays(
			new Date(last_installment_paid.createdAt),
			parseInt(cycle)
		);
		const number_of_days = dateFns.differenceInDays(
			current_date,
			next_due_date
		);

		if (number_of_days <= cycle) {
			//send all payment reminder notification
			sendEmail(subscription.user.email, TEMPLATE.SUBSCRIPTION_REMINDER, {});
		} else {
			if (unpaid_investments < 1) {
				ss; //unpaid_investments++
			} else {
				//plan forfitted
				const subscriptionId = subscription.plan
					? subscription.plan._id
					: subscription.customPlan._id;
				const updatedPlan = await Subscription.findByIdAndUpdate();
				//send notifications
				sendEmail(subscription.user.email, TEMPLATE.SUBSCRIPTION_REMINDER, {});
			}
		}
	});
};
