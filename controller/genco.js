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

exports.postLosses = async (req, res, next) => {
  try {
    req.body.id = new ObjectID().toHexString();
    const id = req.body.id;
    req.body.docType = "lossesconf";
      await Gateway.submitTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "CreateData",
        JSON.stringify(req.body)
      );
      const savedLossesConf = await Gateway.evaluateTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "Find",
        JSON.stringify({
          id: id,
        }),
        "lossesconf"
      );
      res.status(201).json({
        success: true,
        savedLossesConf: savedLossesConf[0],
      });
  } catch (error) {
    next(error);
  }
};

exports.getLosses = async (req, res, next) => {
  try {
    let startDate = req.body.FROM_DATE;
    let endDate = req.body.TO_DATE;
    console.log(req.body, "req.body");
    let obj = req.body;
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === "" || obj[propName] === req.body.FROM_DATE || obj[propName] === req.body.TO_DATE) {
        delete obj[propName];
      }
    }
    console.log(obj, "req.body");
    const losses = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify(obj),
      "lossesconf"
    );
    if (!losses) {
      res.status(400).json({
        success: false,
        msg: "No Record Found",
      });
    } else {
      var resultLossesData = losses.filter(function (a) {
        return a.FROM_DATE >= startDate && a.TO_DATE <= endDate;
      });
      res.status(200).json({
        success: true,
        losses: resultLossesData,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.postgencoOutage = async (req, res, next) => {
  try {
    req.body.id = new ObjectID().toHexString();
    const id = req.body.id;
    req.body.docType = "gencooutage";
      await Gateway.submitTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "CreateData",
        JSON.stringify(req.body)
      );
      const savedOutage = await Gateway.evaluateTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "Find",
        JSON.stringify({
          id: id,
        }),
        "gencooutage"
      );
      res.status(201).json({
        success: true,
        savedOutage: savedOutage[0],
      });
  } catch (error) {
    next(error);
  }
};

exports.getgencoOutage = async (req, res, next) => {
  try {
    let startDate = req.body.FROM_DATE;
    let endDate = req.body.TO_DATE;
    console.log(req.body, "req.body");
    let obj = req.body;
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === "" || obj[propName] === req.body.FROM_DATE || obj[propName] === req.body.TO_DATE) {
        delete obj[propName];
      }
    }
    console.log(obj, "req.body");
    const outages = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify(obj),
      "gencooutage"
    );
    if (!outages) {
      res.status(400).json({
        success: false,
        msg: "No Record Found",
      });
    } else {
      var resultOutageData = outages.filter(function (a) {
        return a.FROM_DATE >= startDate && a.TO_DATE <= endDate;
      });
      res.status(200).json({
        success: true,
        outages: resultOutageData,
      });
    }
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
