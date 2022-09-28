
const ObjectID = require("bson-objectid");
const Gateway = require('../utils/gateway');

exports.getNmaById = async (req, res, next, id) => {
	try {
		const nma = await Gateway.evaluateTransaction("GetbyId", id, "nma");
		req.nma = nma[0]
		next()
	} catch (error) {
		next(error)
	}
}

exports.getNmabyName = async(req, res, next, name) => {
	try {
		console.log(name, "name")
		// const nma = await Gateway.evaluateTransaction("GetbyId", name, "nma");
		// req.nma = nma[0]
		// next()
		const nma = await Gateway.evaluateTransaction(
			'Find',
			JSON.stringify({
				Name: name,
			}),
			'nma'
		);
		res.status(200).json(nma);
	}catch(error) {
		next(error)
	}
}
exports.getAllNmas = async (req, res, next) => {
	try {
		const nmas = await Gateway.evaluateTransaction("GetAll", "nma");
		res.json({
			success: true,
			data: nmas
		})
	} catch (error) {
		next(error)
	}
}
exports.postNma = async (req, res, next) => {
	try {
		req.body.id = new ObjectID().toHexString();
		req.body.docType = "nma";
		const id = req.body.id;
		const {
			nma
		} = await Gateway.submitTransaction("CreateData", JSON.stringify(req.body));
		const savedNma = await Gateway.evaluateTransaction("GetbyId", id, "nma");

		res.json({
			success: true,
			data: {
				savedNma: savedNma[0]
			}
		})
	} catch (error) {
		next(error)
	}
}
exports.updateNma = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		req.body.id = req.params.NmaId;
		const Nma = await Gateway.submitTransaction("UpdateData", JSON.stringify(req.body))
		res.json(Nma)
	} catch (error) {
		next(error)
	}
}
exports.deleteNma = async (req, res, next) => {
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