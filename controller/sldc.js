
const ObjectID = require("bson-objectid");
const Gateway = require('../utils/gateway');

exports.getSldcById = async (req, res, next, id) => {
	try {
		const sldc = await Gateway.evaluateTransaction("GetbyId", id, "sldc");
		req.sldc = sldc[0]
		next()
	} catch (error) {
		next(error)
	}
}

exports.getSldcbyName = async(req, res, next, name) => {
	try {
		console.log(name, "name")
		// const sldc = await Gateway.evaluateTransaction("GetbyId", name, "sldc");
		// req.sldc = sldc[0]
		// next()
		const sldc = await Gateway.evaluateTransaction(
			'Find',
			JSON.stringify({
				Name: name,
			}),
			'sldc'
		);
		res.status(200).json(sldc);
	}catch(error) {
		next(error)
	}
}
exports.getAllSldcs = async (req, res, next) => {
	try {
		const sldcs = await Gateway.evaluateTransaction("GetAll", "sldc");
		res.json({
			success: true,
			data: sldcs
		})
	} catch (error) {
		next(error)
	}
}
exports.postSldc = async (req, res, next) => {
	try {
		req.body.id = new ObjectID().toHexString();
		req.body.docType = "sldc";
		const id = req.body.id;
		const {
			sldc
		} = await Gateway.submitTransaction("CreateData", JSON.stringify(req.body));
		const savedSldc = await Gateway.evaluateTransaction("GetbyId", id, "sldc");

		res.json({
			success: true,
			data: {
				savedSldc: savedSldc[0]
			}
		})
	} catch (error) {
		next(error)
	}
}
exports.updateSldc = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		req.body.id = req.params.SldcId;
		const Sldc = await Gateway.submitTransaction("UpdateData", JSON.stringify(req.body))
		res.json(Sldc)
	} catch (error) {
		next(error)
	}
}
exports.deleteSldc = async (req, res, next) => {
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