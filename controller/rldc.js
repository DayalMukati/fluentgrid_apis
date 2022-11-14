const ObjectID = require("bson-objectid");
const Gateway = require("../utils/gateway");

exports.getRldcById = async (req, res, next, name) => {
  try {
    const rldc = await Gateway.evaluateTransaction(req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
      "Find",
      JSON.stringify({
        Name: name,
      }),
      "rldc"
    );
    req.rldc = rldc[0];
    next();
  } catch (error) {
    next(error);
  }
};

exports.getRldcbyName = async (req, res, next, name) => {
  try {
    console.log(req.query)
    const rldc = await Gateway.evaluateTransaction(
      req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
      "Find",
      JSON.stringify({
        Name: name,
      }),
      "rldc"
    );
    if (!rldc[0]) {
      res.status(400).json({
        success: false,
        msg: "No Record Found",
      });
    } else {
      res.status(200).json({
        success: true,
        rldc: rldc[0],
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.getAllRldcs = async (req, res, next) => {
  try {
    const rldcs = await Gateway.evaluateTransaction(req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
      "GetAll", "rldc");
    res.json({
      success: true,
      data: rldcs,
    });
  } catch (error) {
    next(error);
  }
};
exports.postRldc = async (req, res, next) => {
  try {
    req.body.id = new ObjectID().toHexString();
    req.body.docType = "rldc";
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
      "rldc"
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
        "rldc");

      res.status(201).json({
        success: true,
        savedRldc: savedData[0],
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

exports.updateRldc = async (req, res, next) => {
  try {
    var rldcObj = req.rldc;
    // if(req.rldc.PoCLossCharges){
    // 	rldcObj['PoCLossCharges'].push(req.body.PoCLossCharges);
    // }
    if (req.rldc.RLDCCharges) {
      rldcObj["RLDCCharges"].push(req.body.RLDCCharges);
    }
    await Gateway.submitTransaction(req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName, "UpdateData", JSON.stringify(rldcObj));
    res.status(201).json({
      success: true,
      updatedRldc: rldcObj,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteRldc = async (req, res, next) => {
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