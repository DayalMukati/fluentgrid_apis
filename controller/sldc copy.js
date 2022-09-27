
const ObjectID = require("bson-objectid");
const Gateway = require('../utils/gateway');

exports.getsldcById = async (req, res, next, id) => {
	try {
		const sldc = await Gateway.evaluateTransaction("GetbyId", id, "sldc");
		req.sldc = sldc[0]
		next()
	} catch (error) {
		next(error)
	}
}
exports.getAllsldcs = async (req, res, next) => {
	try {
		const sldces = await Gateway.evaluateTransaction("GetAll", "sldc");
		res.json({
			success: true,
			data: sldces
		})
	} catch (error) {
		next(error)
	}
}
exports.getsldc = async (req, res, next) => {
	try {
		//res.json(req.sldc)
		res.status(200).json(req.sldc);
	} catch (error) {
		next(error)
	}
}
exports.postsldc = async (req, res, next) => {
	try {
		req.body.id = new ObjectID().toHexString();
		const {
			sldc
		} = await Gateway.submitTransaction("Addsldc", JSON.stringify(req.body));
		res.json({
			success: true,
			data: {
				savedsldc: sldc
			}
		})
	} catch (error) {
		next(error)
	}
}
exports.updatesldc = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		req.body.id = req.params.sldcId
		const sldc = await Gateway.submitTransaction("Updatesldc", JSON.stringify(req.body))
		res.json(sldc)
	} catch (error) {
		next(error)
	}
}
exports.deletesldc = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		await Gateway.deleteTransaction("DeleteAsset", req.sldc.id)
		res.json({
			msg: 'Item Deleted'
		})
	} catch (error) {
		next(error)
	}
}
exports.getsldcByUserId = async (req, res, next) => {
	try {
		const sldces = await Gateway.evaluateTransaction("Find", JSON.stringify({
			user: req.user.id
		}), "sldc")
		if (sldces.length > 0) {
			for (let i = 0; i < sldces.length; i++) {
				if (sldces[i].isDefaultsldc == true) {
					res.json({
						success: true,
						data: sldces[i]
					});
				}
			}
		} else {
			res.status(400).json({
				msg: "No sldc found"
			})
		}

	} catch (error) {
		next(error)
	}
}