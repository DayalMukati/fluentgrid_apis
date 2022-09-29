
const ObjectID = require("bson-objectid");
const Gateway = require('../utils/gateway');

exports.getCtuById = async (req, res, next, name) => {
	try {
		const ctu = await Gateway.evaluateTransaction(
			'Find',
			JSON.stringify({
				Name: name,
			}),
			'ctu'
		);
		req.ctu = ctu[0]
		next()
	} catch (error) {
		next(error)
	}
}

exports.getCtubyName = async(req, res, next, name) => {
	try {
		const ctu = await Gateway.evaluateTransaction(
			'Find',
			JSON.stringify({
				Name: name,
			}),
			'ctu'
		);
		if(!ctu[0]){
			res.status(400).json({
				success: false,
				msg: "No Record Found"
			})
		}else{
			res.status(200).json({
				success: true,
				ctu: ctu[0]
				});
		}

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
		req.body.docType = "ctu";
		const id = req.body.id;
		const duplicateCtu = await Gateway.evaluateTransaction(
			'Find',
			JSON.stringify({
				Name: req.body.Name,
			}),
			'ctu'
		);
	if(!duplicateCtu[0]){
		await Gateway.submitTransaction("CreateData", JSON.stringify(req.body));
		const savedCtu = await Gateway.evaluateTransaction("GetbyId", id, "ctu");

		res.status(201).json({
			success: true,
			savedCtu: savedCtu[0]
		})
	}else {
		res.status(400).json({
			success: false,
			meg: "Duplicate Record Found"
			})
	}
	} catch (error) {
		next(error)
	}
}
exports.updateCtu = async (req, res, next) => {
	try {
		var ctuObj  = req.ctu;
		// if(req.ctu.PoCLossCharges){
		// 	ctuObj['PoCLossCharges'].push(req.body.PoCLossCharges);
		// }
		if(req.ctu.CTUWallet){
			ctuObj['CTUWallet'].push(req.body.CTUWallet);
		}
		await Gateway.submitTransaction(
			'UpdateData',
			JSON.stringify(ctuObj)
		);
		res.status(201).json({
			success: true,
			updatedCtu: ctuObj
		});
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