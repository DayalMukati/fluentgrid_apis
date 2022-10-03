const ObjectID = require("bson-objectid");
const Gateway = require("../utils/gateway");

exports.getGencoById = async (req, res, next, name) => {
  try {
    const genco = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        Name: name,
      }),
      "genco"
    );
    req.genco = genco[0];
    next();
  } catch (error) {
    next(error);
  }
};

exports.getGencobyName = async (req, res, next, name) => {
  try {
    const genco = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        Name: name,
      }),
      "genco"
    );
    if (!genco[0]) {
      res.status(400).json({
        success: false,
        msg: "No Record Found",
      });
    } else {
      res.status(200).json({
        success: true,
        genco: genco[0],
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.getAllGencos = async (req, res, next) => {
  try {
    const gencos = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "GetAll",
      "genco"
    );
    res.json({
      success: true,
      data: gencos,
    });
  } catch (error) {
    next(error);
  }
};
exports.postGenco = async (req, res, next) => {
  try {
    req.body.id = new ObjectID().toHexString();
    req.body.docType = "genco";
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
      "genco"
    );
    if (!duplicateData[0]) {
      await Gateway.submitTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "CreateData",
        JSON.stringify(req.body)
      );
      const savedData = await Gateway.evaluateTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "Find",
        JSON.stringify({
          id: id,
        }),
        "genco"
      );

      res.status(201).json({
        success: true,
        savedGenco: savedData[0],
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
exports.updateGenco = async (req, res, next) => {
  try {
    var gencoObj = req.genco;
    // if(req.genco.PoCLossCharges){
    // 	gencoObj['PoCLossCharges'].push(req.body.PoCLossCharges);
    // }
    if (req.genco.BlockWiseDetails) {
      gencoObj["BlockWiseDetails"].push(req.body.BlockWiseDetails);
    }
    await Gateway.submitTransaction(req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,"UpdateData", JSON.stringify(gencoObj));
    res.status(201).json({
      success: true,
      updatedGenco: gencoObj,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteGenco = async (req, res, next) => {
  try {
    // put req.body into  update function and send back to client
    await Gateway.deleteTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "DeleteAsset",
      req.consumer.id
    );
    res.json({
      msg: "Item Deleted",
    });
  } catch (error) {
    next(error);
  }
};
