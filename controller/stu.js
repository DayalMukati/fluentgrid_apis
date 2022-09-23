
const ObjectID = require("bson-objectid");
const Gateway = require('../utils/gateway');

exports.getConsumerById = async (req, res, next, id) => {
	try {
		const consumer = await Gateway.evaluateTransaction("GetbyId", id, "Consumer");
		req.consumer = consumer[0]
		next()
	} catch (error) {
		next(error)
	}
}
exports.getAllConsumers = async (req, res, next) => {
	try {
		const consumeres = await Gateway.evaluateTransaction("GetAll", "Consumer");
		res.json({
			success: true,
			data: consumeres
		})
	} catch (error) {
		next(error)
	}
}
exports.getConsumer = async (req, res, next) => {
	try {
		//res.json(req.consumer)
		res.status(200).json(req.consumer);
	} catch (error) {
		next(error)
	}
}
exports.postConsumer = async (req, res, next) => {
	try {
		req.body.id = new ObjectID().toHexString();
		const {
			consumer
		} = await Gateway.submitTransaction("AddConsumer", JSON.stringify(req.body));
		res.json({
			success: true,
			data: {
				savedConsumer: consumer
			}
		})
	} catch (error) {
		next(error)
	}
}
exports.updateConsumer = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		req.body.id = req.params.consumerId
		const consumer = await Gateway.submitTransaction("UpdateConsumer", JSON.stringify(req.body))
		res.json(consumer)
	} catch (error) {
		next(error)
	}
}
exports.deleteConsumer = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		await Gateway.deleteTransaction("DeleteAsset", req.consumer.id)
		res.json({
			msg: 'Item Deleted'
		})
	} catch (error) {
		next(error)
	}
}
exports.getConsumerByUserId = async (req, res, next) => {
	try {
		const consumeres = await Gateway.evaluateTransaction("Find", JSON.stringify({
			user: req.user.id
		}), "Consumer")
		if (consumeres.length > 0) {
			for (let i = 0; i < consumeres.length; i++) {
				if (consumeres[i].isDefaultConsumer == true) {
					res.json({
						success: true,
						data: consumeres[i]
					});
				}
			}
		} else {
			res.status(400).json({
				msg: "No consumer found"
			})
		}

	} catch (error) {
		next(error)
	}
}