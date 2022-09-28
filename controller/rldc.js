
const ObjectID = require("bson-objectid");
const Gateway = require('../utils/gateway');

exports.getRldcById = async (req, res, next, id) => {
	try {
		const rldc = await Gateway.evaluateTransaction("GetbyId", id, "rldc");
		req.rldc = rldc[0]
		next()
	} catch (error) {
		next(error)
	}
}

exports.getRldcbyName = async(req, res, next, name) => {
	try {
		console.log(name, "name")
		// const rldc = await Gateway.evaluateTransaction("GetbyId", name, "rldc");
		// req.rldc = rldc[0]
		// next()
		const rldc = await Gateway.evaluateTransaction(
			'Find',
			JSON.stringify({
				Name: name,
			}),
			'rldc'
		);
		res.status(200).json(rldc);
	}catch(error) {
		next(error)
	}
}
exports.getAllRldcs = async (req, res, next) => {
	try {
		const rldcs = await Gateway.evaluateTransaction("GetAll", "rldc");
		res.json({
			success: true,
			data: rldcs
		})
	} catch (error) {
		next(error)
	}
}
exports.postRldc = async (req, res, next) => {
	try {
		req.body.id = new ObjectID().toHexString();
		req.body.docType = "rldc";
		const id = req.body.id;
		const {
			rldc
		} = await Gateway.submitTransaction("CreateData", JSON.stringify(req.body));
		const savedRldc = await Gateway.evaluateTransaction("GetbyId", id, "rldc");

		res.json({
			success: true,
			data: {
				savedRldc: savedRldc[0]
			}
		})
	} catch (error) {
		next(error)
	}
}
exports.updateRldc = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		req.body.id = req.params.RldcId;
		const Rldc = await Gateway.submitTransaction("UpdateData", JSON.stringify(req.body))
		res.json(Rldc)
	} catch (error) {
		next(error)
	}
}
exports.deleteRldc = async (req, res, next) => {
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