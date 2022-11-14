const ObjectID = require("bson-objectid");
const Gateway = require("../utils/gateway");

exports.getStuById = async (req, res, next, name) => {
  try {
    const stu = await Gateway.evaluateTransaction(req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
      "Find",
      JSON.stringify({
        Name: name,
      }),
      "stu"
    );
    req.stu = stu[0];
    next();
  } catch (error) {
    next(error);
  }
};

exports.getStubyName = async (req, res, next, name) => {
  try {
    console.log(req.query)
    const stu = await Gateway.evaluateTransaction(
      req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
      "Find",
      JSON.stringify({
        Name: name,
      }),
      "stu"
    );
    if (!stu[0]) {
      res.status(400).json({
        success: false,
        msg: "No Record Found",
      });
    } else {
      res.status(200).json({
        success: true,
        stu: stu[0],
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.getAllStus = async (req, res, next) => {
  try {
    const stus = await Gateway.evaluateTransaction(req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
      "GetAll", "stu");
    res.json({
      success: true,
      data: stus,
    });
  } catch (error) {
    next(error);
  }
};
exports.postStu = async (req, res, next) => {
  try {
    req.body.id = new ObjectID().toHexString();
    req.body.docType = "stu";
    const id = req.body.id;
    const duplicateData = await Gateway.evaluateTransaction(
      req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
      "Find",
      JSON.stringify({
        Name: req.body.Name,
      }),
      "stu"
    );
    if (!duplicateData[0]) {
      await Gateway.submitTransaction(req.query.org,
        req.query.appUserId,
        req.query.channelName,
        req.query.chaincodeName,
        "CreateData", JSON.stringify(req.body));
      const savedData = await Gateway.evaluateTransaction(req.query.org,
        req.query.appUserId,
        req.query.channelName,
        req.query.chaincodeName,
        "Find",
        JSON.stringify({
          id: id,
        }),
        "stu");

      res.status(201).json({
        success: true,
        savedStu: savedData[0],
      });
    } else {
      res.status(400).json({
        success: false,
        meg: "Duplicate Record Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateStu = async (req, res, next) => {
  try {
    var stuObj = req.stu;
    // if(req.stu.PoCLossCharges){
    // 	stuObj['PoCLossCharges'].push(req.body.PoCLossCharges);
    // }
    if (req.stu.TransmissionLossCharges) {
      stuObj["TransmissionLossCharges"].push(req.body.TransmissionLossCharges);
    }
    await Gateway.submitTransaction(req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName, "UpdateData", JSON.stringify(stuObj));
    res.status(201).json({
      success: true,
      updatedStu: stuObj,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteStu = async (req, res, next) => {
  try {
    // put req.body into  update function and send back to client
    await Gateway.deleteTransaction(req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
      "DeleteAsset", req.query.name);
    res.json({
      msg: "Item Deleted",
    });
  } catch (error) {
    next(error);
  }
};