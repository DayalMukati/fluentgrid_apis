
const ObjectID = require("bson-objectid");
const Gateway = require('../utils/gateway');

exports.getctuById = async (req, res, next, id) => {
	try {
		const ctu = await Gateway.evaluateTransaction("GetbyId", id, "ctu");
		req.ctu = ctu[0]
		next()
	} catch (error) {
		next(error)
	}
}
exports.getAllCtus = async (req, res, next) => {
	try {
		const ctues = await Gateway.evaluateTransaction("GetAll", "ctu");
		res.json({
			success: true,
			data: ctues
		})
	} catch (error) {
		next(error)
	}
}
exports.getctu = async (req, res, next) => {
	try {
		//res.json(req.ctu)
		res.status(200).json(req.ctu);
	} catch (error) {
		next(error)
	}
}
exports.postctu = async (req, res, next) => {
	try {
		req.body.id = new ObjectID().toHexString();
		const {
			ctu
		} = await Gateway.submitTransaction("Addctu", JSON.stringify(req.body));
		res.json({
			success: true,
			data: {
				savedctu: ctu
			}
		})
	} catch (error) {
		next(error)
	}
}
exports.updatectu = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		req.body.id = req.params.ctuId
		const ctu = await Gateway.submitTransaction("Updatectu", JSON.stringify(req.body))
		res.json(ctu)
	} catch (error) {
		next(error)
	}
}
exports.deletectu = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		await Gateway.deleteTransaction("DeleteAsset", req.ctu.id)
		res.json({
			msg: 'Item Deleted'
		})
	} catch (error) {
		next(error)
	}
}
exports.getctuByUserId = async (req, res, next) => {
	try {
		const ctues = await Gateway.evaluateTransaction("Find", JSON.stringify({
			user: req.user.id
		}), "ctu")
		if (ctues.length > 0) {
			for (let i = 0; i < ctues.length; i++) {
				if (ctues[i].isDefaultctu == true) {
					res.json({
						success: true,
						data: ctues[i]
					});
				}
			}
		} else {
			res.status(400).json({
				msg: "No ctu found"
			})
		}

	} catch (error) {
		next(error)
	}
}