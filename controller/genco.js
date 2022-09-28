
const ObjectID = require("bson-objectid");
const Gateway = require('../utils/gateway');

exports.getGencoById = async (req, res, next, id) => {
	try {
		const genco = await Gateway.evaluateTransaction("GetbyId", id, "genco");
		req.genco = genco[0]
		next()
	} catch (error) {
		next(error)
	}
}

exports.getGencobyName = async(req, res, next, name) => {
	try {
		console.log(name, "name")
		// const genco = await Gateway.evaluateTransaction("GetbyId", name, "genco");
		// req.genco = genco[0]
		// next()
		const genco = await Gateway.evaluateTransaction(
			'Find',
			JSON.stringify({
				Name: name,
			}),
			'genco'
		);
		res.status(200).json(genco);
	}catch(error) {
		next(error)
	}
}
exports.getAllGencos = async (req, res, next) => {
	try {
		const gencos = await Gateway.evaluateTransaction("GetAll", "genco");
		res.json({
			success: true,
			data: gencos
		})
	} catch (error) {
		next(error)
	}
}
exports.postGenco = async (req, res, next) => {
	try {
		req.body.id = new ObjectID().toHexString();
		req.body.docType = "genco";
		const id = req.body.id;
		const {
			genco
		} = await Gateway.submitTransaction("CreateData", JSON.stringify(req.body));
		const savedGenco = await Gateway.evaluateTransaction("GetbyId", id, "genco");

		res.json({
			success: true,
			data: {
				savedGenco: savedGenco[0]
			}
		})
	} catch (error) {
		next(error)
	}
}
exports.updateGenco = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		req.body.id = req.params.GencoId;
		const Genco = await Gateway.submitTransaction("UpdateData", JSON.stringify(req.body))
		res.json(Genco)
	} catch (error) {
		next(error)
	}
}
exports.deleteGenco = async (req, res, next) => {
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