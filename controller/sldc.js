const ObjectID = require("bson-objectid");
const Gateway = require("../utils/gateway");

exports.getSldcById = async (req, res, next, name) => {
  try {
    const sldc = await Gateway.evaluateTransaction(req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        Name: name,
      }),
      "sldc"
    );
    req.sldc = sldc[0];
    next();
  } catch (error) {
    next(error);
  }
};

exports.getSldcbyName = async (req, res, next, name) => {
  try {
    console.log(req.params)
    const sldc = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        Name: name,
      }),
      "sldc"
    );
    if (!sldc[0]) {
      res.status(400).json({
        success: false,
        msg: "No Record Found",
      });
    } else {
      res.status(200).json({
        success: true,
        sldc: sldc[0],
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.getAllSldcs = async (req, res, next) => {
  try {
    const sldcs = await Gateway.evaluateTransaction(req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "GetAll", "sldc");
    res.json({
      success: true,
      data: sldcs,
    });
  } catch (error) {
    next(error);
  }
};
exports.postSldc = async (req, res, next) => {
  try {
    req.body.id = new ObjectID().toHexString();
    req.body.docType = "sldc";
    const id = req.body.id;
    const duplicateData = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        Name: req.body.Name,
      }),
      "sldc"
    );
    if (!duplicateData[0]) {
      await Gateway.submitTransaction(req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "CreateData", JSON.stringify(req.body));
      const savedData = await Gateway.evaluateTransaction(req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "Find",
        JSON.stringify({
          id: id,
        }),
        "sldc");

      res.status(201).json({
        success: true,
        savedSldc: savedData[0],
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

exports.updateSldc = async (req, res, next) => {
  try {
    var sldcObj = req.sldc;
    // if(req.sldc.PoCLossCharges){
    // 	sldcObj['PoCLossCharges'].push(req.body.PoCLossCharges);
    // }
    if (req.sldc.SLDCCharges) {
      sldcObj["SLDCCharges"].push(req.body.SLDCCharges);
    }
    await Gateway.submitTransaction(req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,"UpdateData", JSON.stringify(sldcObj));
    res.status(201).json({
      success: true,
      updatedSldc: sldcObj,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSldc = async (req, res, next) => {
  try {
    // put req.body into  update function and send back to client
    await Gateway.deleteTransaction(req.params.org,
		req.params.appUserId,
		req.params.channelName,
		req.params.chaincodeName,
		"DeleteAsset", req.sldc.id);
    res.json({
      msg: "Item Deleted",
    });
  } catch (error) {
    next(error);
  }
};
