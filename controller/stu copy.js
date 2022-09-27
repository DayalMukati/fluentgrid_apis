
const ObjectID = require("bson-objectid");
const Gateway = require('../utils/gateway');

exports.getstuById = async (req, res, next, id) => {
	try {
		const stu = await Gateway.evaluateTransaction("GetbyId", id, "stu");
		req.stu = stu[0]
		next()
	} catch (error) {
		next(error)
	}
}
exports.getAllstus = async (req, res, next) => {
	try {
		const stues = await Gateway.evaluateTransaction("GetAll", "stu");
		res.json({
			success: true,
			data: stues
		})
	} catch (error) {
		next(error)
	}
}
exports.getstu = async (req, res, next) => {
	try {
		//res.json(req.stu)
		res.status(200).json(req.stu);
	} catch (error) {
		next(error)
	}
}
exports.poststu = async (req, res, next) => {
	try {
		req.body.id = new ObjectID().toHexString();
		const {
			stu
		} = await Gateway.submitTransaction("Addstu", JSON.stringify(req.body));
		res.json({
			success: true,
			data: {
				savedstu: stu
			}
		})
	} catch (error) {
		next(error)
	}
}
exports.updatestu = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		req.body.id = req.params.stuId
		const stu = await Gateway.submitTransaction("Updatestu", JSON.stringify(req.body))
		res.json(stu)
	} catch (error) {
		next(error)
	}
}
exports.deletestu = async (req, res, next) => {
	try {
		// put req.body into  update function and send back to client
		await Gateway.deleteTransaction("DeleteAsset", req.stu.id)
		res.json({
			msg: 'Item Deleted'
		})
	} catch (error) {
		next(error)
	}
}
exports.getstuByUserId = async (req, res, next) => {
	try {
		const stues = await Gateway.evaluateTransaction("Find", JSON.stringify({
			user: req.user.id
		}), "stu")
		if (stues.length > 0) {
			for (let i = 0; i < stues.length; i++) {
				if (stues[i].isDefaultstu == true) {
					res.json({
						success: true,
						data: stues[i]
					});
				}
			}
		} else {
			res.status(400).json({
				msg: "No stu found"
			})
		}

	} catch (error) {
		next(error)
	}
}