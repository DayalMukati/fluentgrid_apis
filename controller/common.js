const ObjectID = require("bson-objectid");
const Gateway = require("../utils/gateway");

exports.postLosscharge = async (req, res, next) => {
  try {
    req.body.id = new ObjectID().toHexString();
    const id = req.body.id;
    req.body.docType = req.params.entity + "losscharge";
    const lossData = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        Name: req.body.Name,
      }),
      req.params.entity
    );
    if (lossData[0]) {
      await Gateway.submitTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "CreateData",
        JSON.stringify(req.body)
      );
      const savedLoss = await Gateway.evaluateTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "Find",
        JSON.stringify({
          id: id,
        }),
        req.body.docType
      );

      res.status(201).json({
        success: true,
        savedLoss: savedLoss[0],
      });
    } else {
      res.status(400).json({
        success: false,
        meg: "Record Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getLosscharge = async (req, res, next) => {
  try {
    let obj = req.body;
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === "") {
        delete obj[propName];
      }
    }
    console.log(obj, "req.body");
    const loss = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify(obj),
      req.params.entity + "losscharge"
    );
    if (!loss) {
      res.status(400).json({
        success: false,
        msg: "No Record Found",
      });
    } else {
      res.status(200).json({
        success: true,
        losses: loss,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.postOutage = async (req, res, next) => {
  try {
    req.body.id = new ObjectID().toHexString();
    const id = req.body.id;
    req.body.docType = req.params.entity + "outage";
    const outageData = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        Name: req.body.Name,
      }),
      req.params.entity
    );
    if (outageData[0]) {
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
        req.body.docType
      );

      res.status(201).json({
        success: true,
        savedOutage: savedOutage[0],
      });
    } else {
      res.status(400).json({
        success: false,
        meg: "Record Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getOutage = async (req, res, next) => {
  try {
    let obj = req.body;
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === "") {
        delete obj[propName];
      }
    }
    console.log(obj, "req.body");
    const outage = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify(obj),
      req.params.entity + "outage"
    );
    if (!outage) {
      res.status(400).json({
        success: false,
        msg: "No Record Found",
      });
    } else {
      res.status(200).json({
        success: true,
        outages: outage,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.postWallet = async (req, res, next) => {
  try {
    let wallet = {
      ...req.body,
      id: new ObjectID().toHexString(),
      docType: "wallet",
      updatedAt: new Date(),
      Transactions: [],
    };
    const walletData = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        OrganizationName: req.body.OrganizationName,
      }),
      "wallet"
    );
    if (!walletData[0]) {
      await Gateway.submitTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "CreateData",
        JSON.stringify(wallet)
      );
      const savedWallet = await Gateway.evaluateTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "Find",
        JSON.stringify({
          id: wallet.id,
        }),
        "wallet"
      );

      res.status(201).json({
        success: true,
        savedWallet: savedWallet[0],
      });
    } else {
      res.status(400).json({
        success: false,
        meg: "Wallet Already Created",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getWallet = async (req, res, next) => {
  try {
    // let obj = req.body;
    // for (var propName in obj) {
    //   if (obj[propName] === null || obj[propName] === "") {
    //     delete obj[propName];
    //   }
    // }
    // console.log(obj, "req.body");
    const wallet = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({ OrganizationName: req.body.OrganizationName }),
      "wallet"
    );
    if (!wallet) {
      res.status(400).json({
        success: false,
        msg: "No Record Found",
      });
    } else {
      res.status(200).json({
        success: true,
        wallet: wallet,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.postDSM1 = async (req, res, next) => {
  try {
    let data = {
      ...req.body,
      id: new ObjectID().toHexString(),
      docType: "DSM1",
    };
    await Gateway.submitTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "CreateData",
      JSON.stringify(data)
    );
    const savedData = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        id: data.id,
      }),
      "DSM1"
    );

    res.status(201).json({
      success: true,
      savedData: savedData[0],
    });
  } catch (error) {
    next(error);
  }
};

exports.postDSM2 = async (req, res, next) => {
  try {
    let data = {
      ...req.body,
      id: new ObjectID().toHexString(),
      docType: "DSM2",
    };
    await Gateway.submitTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "CreateData",
      JSON.stringify(data)
    );
    const savedData = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        id: data.id,
      }),
      "DSM2"
    );

    res.status(201).json({
      success: true,
      savedData: savedData[0],
    });
  } catch (error) {
    next(error);
  }
};

exports.getDSM1 = async (req, res, next) => {
  try {
    let obj = req.body;
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === "") {
        delete obj[propName];
      }
    }
    console.log(obj, "req.body");
    const data = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify(obj),
      "DSM1"
    );
    if (!data) {
      res.status(400).json({
        success: false,
        msg: "No Record Found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: data,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getDSM2 = async (req, res, next) => {
  try {
    let obj = req.body;
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === "") {
        delete obj[propName];
      }
    }
    console.log(obj, "req.body");
    const data = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify(obj),
      "DSM2"
    );
    if (!data) {
      res.status(400).json({
        success: false,
        msg: "No Record Found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: data,
      });
    }
  } catch (error) {
    next(error);
  }
};