
const ObjectID = require("bson-objectid");
const Gateway = require('../utils/gateway');

exports.getgencoById = async (req, res, next, id) => {
	try {
		const genco = await Gateway.evaluateTransaction("GetbyId", id, "genco");
		req.genco = genco[0]
		next()
	} catch (error) {
		next(error)
	}
}
exports.getAllgencos = async (req, res, next) => {
	try {
		const gencoes = await Gateway.evaluateTransaction("GetAll", "genco");
		res.json({
			success: true,
			data: gencoes
		})
	} catch (error) {
		next(error)
	}
}
exports.getgenco = async (req, res, next) => {
	try {
		//res.json(req.genco)
		res.status(200).json(req.genco);
	} catch (error) {
		next(error)
	}
}
exports.postgenco = async (req, res, next) => {
	try {
		req.body.id = new ObjectID().toHexString();
		const {
			genco
		} = await Gateway.submitTransaction("Addgenco", JSON.stringify(req.body));
		res.json({
			success: true,
			data: {
				savedgenco: genco
			}
		})
	} catch (error) {
		next(error)
	}
}
exports.updategenco = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		req.body.id = req.params.gencoId
		const genco = await Gateway.submitTransaction("Updategenco", JSON.stringify(req.body))
		res.json(genco)
	} catch (error) {
		next(error)
	}
}
exports.deletegenco = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		await Gateway.deleteTransaction("DeleteAsset", req.genco.id)
		res.json({
			msg: 'Item Deleted'
		})
	} catch (error) {
		next(error)
	}
}
exports.getgencoByUserId = async (req, res, next) => {
	try {
		const gencoes = await Gateway.evaluateTransaction("Find", JSON.stringify({
			user: req.user.id
		}), "genco")
		if (gencoes.length > 0) {
			for (let i = 0; i < gencoes.length; i++) {
				if (gencoes[i].isDefaultgenco == true) {
					res.json({
						success: true,
						data: gencoes[i]
					});
				}
			}
		} else {
			res.status(400).json({
				msg: "No genco found"
			})
		}

	} catch (error) {
		next(error)
	}
}