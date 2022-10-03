const ObjectID = require("bson-objectid");
const Gateway = require("../utils/gateway");

exports.getNmaById = async (req, res, next, name) => {
  try {
    const nma = await Gateway.evaluateTransaction(req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        Name: name,
      }),
      "nma"
    );
    req.nma = nma[0];
    next();
  } catch (error) {
    next(error);
  }
};

exports.getNmabyName = async (req, res, next, name) => {
  try {
    console.log(req.params)
    const nma = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        Name: name,
      }),
      "nma"
    );
    if (!nma[0]) {
      res.status(400).json({
        success: false,
        msg: "No Record Found",
      });
    } else {
      res.status(200).json({
        success: true,
        nma: nma[0],
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.getAllNmas = async (req, res, next) => {
  try {
    const nmas = await Gateway.evaluateTransaction(req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "GetAll", "nma");
    res.json({
      success: true,
      data: nmas,
    });
  } catch (error) {
    next(error);
  }
};
exports.postNma = async (req, res, next) => {
  try {
    req.body.id = new ObjectID().toHexString();
    req.body.docType = "nma";
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
      "nma"
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
        "nma");

      res.status(201).json({
        success: true,
        savedNma: savedData[0],
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

exports.updateNma = async (req, res, next) => {
  try {
    var nmaObj = req.nma;
    // if(req.nma.PoCLossCharges){
    // 	nmaObj['PoCLossCharges'].push(req.body.PoCLossCharges);
    // }
    if (req.nma.WheelingLossCharges) {
      nmaObj["WheelingLossCharges"].push(req.body.WheelingLossCharges);
    }
    await Gateway.submitTransaction(req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,"UpdateData", JSON.stringify(nmaObj));
    res.status(201).json({
      success: true,
      updatedNma: nmaObj,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteNma = async (req, res, next) => {
  try {
    // put req.body into  update function and send back to client
    await Gateway.deleteTransaction(req.params.org,
		req.params.appUserId,
		req.params.channelName,
		req.params.chaincodeName,
		"DeleteAsset", req.nma.id);
    res.json({
      msg: "Item Deleted",
    });
  } catch (error) {
    next(error);
  }
};
