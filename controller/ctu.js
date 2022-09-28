
const ObjectID = require("bson-objectid");
const Gateway = require('../utils/gateway');

exports.getCtuById = async (req, res, next, id) => {
	try {
		const ctu = await Gateway.evaluateTransaction("GetbyId", id, "ctu");
		req.ctu = ctu[0]
		next()
	} catch (error) {
		next(error)
	}
}

exports.getCtu = async(req, res, next, name) => {
	try {
		console.log(name, "name")
		const ctu = await Gateway.evaluateTransaction("GetbyId", name, "ctu");
		req.ctu = ctu[0]
		next()
		// const ctu = await Gateway.evaluateTransaction(
		// 	'Find',
		// 	JSON.stringify({
		// 		Name: name,
		// 	}),
		// 	'ctu'
		// );
	}catch(error) {
		next(error)
	}
}
exports.getAllCtus = async (req, res, next) => {
	try {
		const ctus = await Gateway.evaluateTransaction("GetAll", "ctu");
		res.json({
			success: true,
			data: ctus
		})
	} catch (error) {
		next(error)
	}
}
exports.postCtu = async (req, res, next) => {
	try {
		req.body.id = new ObjectID().toHexString();
		const {
			ctu
		} = await Gateway.submitTransaction("CreateData", JSON.stringify(req.body));
		res.json({
			success: true,
			data: {
				savedCtu: ctu
			}
		})
	} catch (error) {
		next(error)
	}
}
exports.updateCtu = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		req.body.id = req.params.CtuId
		const Ctu = await Gateway.submitTransaction("UpdateConsumer", JSON.stringify(req.body))
		res.json(consumer)
	} catch (error) {
		next(error)
	}
}
exports.deleteCtu = async (req, res, next) => {
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