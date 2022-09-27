
const ObjectID = require("bson-objectid");
const Gateway = require('../utils/gateway');

exports.getnmaById = async (req, res, next, id) => {
	try {
		const nma = await Gateway.evaluateTransaction("GetbyId", id, "nma");
		req.nma = nma[0]
		next()
	} catch (error) {
		next(error)
	}
}
exports.getAllnmas = async (req, res, next) => {
	try {
		const nmaes = await Gateway.evaluateTransaction("GetAll", "nma");
		res.json({
			success: true,
			data: nmaes
		})
	} catch (error) {
		next(error)
	}
}
exports.getnma = async (req, res, next) => {
	try {
		//res.json(req.nma)
		res.status(200).json(req.nma);
	} catch (error) {
		next(error)
	}
}
exports.postnma = async (req, res, next) => {
	try {
		req.body.id = new ObjectID().toHexString();
		const {
			nma
		} = await Gateway.submitTransaction("Addnma", JSON.stringify(req.body));
		res.json({
			success: true,
			data: {
				savednma: nma
			}
		})
	} catch (error) {
		next(error)
	}
}
exports.updatenma = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		req.body.id = req.params.nmaId
		const nma = await Gateway.submitTransaction("Updatenma", JSON.stringify(req.body))
		res.json(nma)
	} catch (error) {
		next(error)
	}
}
exports.deletenma = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		await Gateway.deleteTransaction("DeleteAsset", req.nma.id)
		res.json({
			msg: 'Item Deleted'
		})
	} catch (error) {
		next(error)
	}
}
exports.getnmaByUserId = async (req, res, next) => {
	try {
		const nmaes = await Gateway.evaluateTransaction("Find", JSON.stringify({
			user: req.user.id
		}), "nma")
		if (nmaes.length > 0) {
			for (let i = 0; i < nmaes.length; i++) {
				if (nmaes[i].isDefaultnma == true) {
					res.json({
						success: true,
						data: nmaes[i]
					});
				}
			}
		} else {
			res.status(400).json({
				msg: "No nma found"
			})
		}

	} catch (error) {
		next(error)
	}
}