
const ObjectID = require("bson-objectid");
const Gateway = require('../utils/gateway');

exports.getStuById = async (req, res, next, id) => {
	try {
		const stu = await Gateway.evaluateTransaction("GetbyId", id, "stu");
		req.stu = stu[0]
		next()
	} catch (error) {
		next(error)
	}
}

exports.getStubyName = async(req, res, next, name) => {
	try {
		console.log(name, "name")
		// const stu = await Gateway.evaluateTransaction("GetbyId", name, "stu");
		// req.stu = stu[0]
		// next()
		const stu = await Gateway.evaluateTransaction(
			'Find',
			JSON.stringify({
				Name: name,
			}),
			'stu'
		);
		res.status(200).json(stu);
	}catch(error) {
		next(error)
	}
}
exports.getAllStus = async (req, res, next) => {
	try {
		const stus = await Gateway.evaluateTransaction("GetAll", "stu");
		res.json({
			success: true,
			data: stus
		})
	} catch (error) {
		next(error)
	}
}
exports.postStu = async (req, res, next) => {
	try {
		req.body.id = new ObjectID().toHexString();
		req.body.docType = "stu";
		const id = req.body.id;
		const {
			stu
		} = await Gateway.submitTransaction("CreateData", JSON.stringify(req.body));
		const savedStu = await Gateway.evaluateTransaction("GetbyId", id, "stu");

		res.json({
			success: true,
			data: {
				savedStu: savedStu[0]
			}
		})
	} catch (error) {
		next(error)
	}
}
exports.updateStu = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		req.body.id = req.params.StuId;
		const Stu = await Gateway.submitTransaction("UpdateData", JSON.stringify(req.body))
		res.json(Stu)
	} catch (error) {
		next(error)
	}
}
exports.deleteStu = async (req, res, next) => {
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