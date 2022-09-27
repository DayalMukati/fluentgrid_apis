
const ObjectID = require("bson-objectid");
const Gateway = require('../utils/gateway');

exports.getrldcById = async (req, res, next, id) => {
	try {
		const rldc = await Gateway.evaluateTransaction("GetbyId", id, "rldc");
		req.rldc = rldc[0]
		next()
	} catch (error) {
		next(error)
	}
}
exports.getAllrldcs = async (req, res, next) => {
	try {
		const rldces = await Gateway.evaluateTransaction("GetAll", "rldc");
		res.json({
			success: true,
			data: rldces
		})
	} catch (error) {
		next(error)
	}
}
exports.getrldc = async (req, res, next) => {
	try {
		//res.json(req.rldc)
		res.status(200).json(req.rldc);
	} catch (error) {
		next(error)
	}
}
exports.postrldc = async (req, res, next) => {
	try {
		req.body.id = new ObjectID().toHexString();
		const {
			rldc
		} = await Gateway.submitTransaction("Addrldc", JSON.stringify(req.body));
		res.json({
			success: true,
			data: {
				savedrldc: rldc
			}
		})
	} catch (error) {
		next(error)
	}
}
exports.updaterldc = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		req.body.id = req.params.rldcId
		const rldc = await Gateway.submitTransaction("Updaterldc", JSON.stringify(req.body))
		res.json(rldc)
	} catch (error) {
		next(error)
	}
}
exports.deleterldc = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		await Gateway.deleteTransaction("DeleteAsset", req.rldc.id)
		res.json({
			msg: 'Item Deleted'
		})
	} catch (error) {
		next(error)
	}
}
exports.getrldcByUserId = async (req, res, next) => {
	try {
		const rldces = await Gateway.evaluateTransaction("Find", JSON.stringify({
			user: req.user.id
		}), "rldc")
		if (rldces.length > 0) {
			for (let i = 0; i < rldces.length; i++) {
				if (rldces[i].isDefaultrldc == true) {
					res.json({
						success: true,
						data: rldces[i]
					});
				}
			}
		} else {
			res.status(400).json({
				msg: "No rldc found"
			})
		}

	} catch (error) {
		next(error)
	}
}