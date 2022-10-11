const ObjectID = require("bson-objectid");
const Gateway = require("../utils/gateway");

exports.getConsumerById = async (req, res, next, accountNo) => {
  try {
    const consumer = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        AccountNumber: accountNo,
      }),
      "consumer"
    );
    req.consumer = consumer[0];
    next();
  } catch (error) {
    next(error);
  }
};

exports.getConsumerbyName = async (req, res, next, accountNo) => {
  try {
    console.log(req.params);
    const consumer = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        AccountNumber: accountNo,
      }),
      "consumer"
    );
    if (!consumer[0]) {
      res.status(400).json({
        success: false,
        msg: "No Record Found",
      });
    } else {
      res.status(200).json({
        success: true,
        consumer: consumer[0],
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.getAllConsumers = async (req, res, next) => {
  try {
    const consumers = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "GetAll",
      "consumer"
    );
    res.json({
      success: true,
      data: consumers,
    });
  } catch (error) {
    next(error);
  }
};
exports.postConsumer = async (req, res, next) => {
  try {
    req.body.id = new ObjectID().toHexString();
    req.body.docType = "consumer";
    const id = req.body.id;
    const duplicateConsumer = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        AccountNumber: req.body.AccountNumber,
      }),
      "consumer"
    );
    if (!duplicateConsumer[0]) {
      await Gateway.submitTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "CreateData",
        JSON.stringify(req.body)
      );
      const savedConsumer = await Gateway.evaluateTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "Find",
        JSON.stringify({
          id: id,
        }),
        "consumer"
      );

      res.status(201).json({
        success: true,
        savedConsumer: savedConsumer[0],
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
exports.updateConsumer = async (req, res, next) => {
  try {
    // if(req.consumer.PoCLossCharges){
    // 	consumerObj['PoCLossCharges'].push(req.body.PoCLossCharges);
    // }
    const consumerData = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        AccountNumber: req.params.accountNo,
      }),
      "consumer"
    );
    const consumer = consumerData[0];
    var consumerObj = {
      ...consumer,
      ...req.body,
    };
    await Gateway.submitTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "UpdateData",
      JSON.stringify(consumerObj)
    );
    res.status(201).json({
      success: true,
      updatedConsumer: consumerObj,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateWallet = async (req, res, next) => {
  try {
    const consumerData = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        AccountNumber: req.params.accountNo,
      }),
      "consumer"
    );
    const consumer = consumerData[0];
    var consumerObj = {
      ...consumer,
      ...req.body,
    };
    await Gateway.submitTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "UpdateData",
      JSON.stringify(consumerObj)
    );
    res.status(201).json({
      success: true,
      updatedConsumer: consumerObj,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateMonthly = async (req, res, next) => {
  try {
    var consumerObj = req.consumer;
    // if(req.consumer.PoCLossCharges){
    // 	consumerObj['PoCLossCharges'].push(req.body.PoCLossCharges);
    // }
    if (req.consumer.ConsumerPackDetails) {
      consumerObj["ConsumerPackDetails"].push(req.body.ConsumerPackDetails);
    }
    await Gateway.submitTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "UpdateData",
      JSON.stringify(consumerObj)
    );
    res.status(201).json({
      success: true,
      updatedConsumer: consumerObj,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePack = async (req, res, next) => {
  try {
    const consumerData = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        AccountNumber: req.params.accountNo,
      }),
      "consumer"
    );
    var consumerObj = consumerData[0];

    consumerObj["ConsumerPackDetails"].push(req.body.ConsumerPackDetails);
    await Gateway.submitTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "UpdateData",
      JSON.stringify(consumerObj)
    );
    res.status(201).json({
      success: true,
      updatedConsumer: consumerObj,
    });
  } catch (error) {
    next(error);
  }
};

exports.dailyBill = async (req, res, next) => {
  try {
    req.body.id = new ObjectID().toHexString();
    const id = req.body.id;
    req.body.docType = "dailybill";
    const consumerData = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        AccountNumber: req.params.accountNo,
      }),
      "consumer"
    );
    if (consumerData[0]) {
      await Gateway.submitTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "CreateData",
        JSON.stringify(req.body)
      );
      const savedBill = await Gateway.evaluateTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "Find",
        JSON.stringify({
          id: id,
        }),
        "dailybill"
      );

      res.status(201).json({
        success: true,
        savedBill: savedBill[0],
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

exports.getBill = async (req, res, next) => {
  try {
    console.log(req.body, "req.body");
    let obj = req.body;
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === "") {
        delete obj[propName];
      }
    }
    console.log(obj, "req.body");
    const bill = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify(obj),
      "dailybill"
    );
    if (!bill) {
      res.status(400).json({
        success: false,
        msg: "No Record Found",
      });
    } else {
      res.status(200).json({
        success: true,
        bills: bill,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.createRecharge = async (req, res, next) => {
  try {
    req.body.id = new ObjectID().toHexString();
    const id = req.body.id;
    req.body.docType = "recharge";
    const consumerData = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        AccountNumber: req.params.accountNo,
      }),
      "consumer"
    );
    if (consumerData[0]) {
      await Gateway.submitTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "CreateData",
        JSON.stringify(req.body)
      );
      const savedRecharge = await Gateway.evaluateTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "Find",
        JSON.stringify({
          id: id,
        }),
        "recharge"
      );

      res.status(201).json({
        success: true,
        savedRecharge: savedRecharge[0],
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

exports.getRecharge = async (req, res, next) => {
  try {
    console.log(req.body, "req.body");
    let obj = req.body;
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === "") {
        delete obj[propName];
      }
    }
    console.log(obj, "req.body");
    const recharge = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify(obj),
      "recharge"
    );
    if (!recharge) {
      res.status(400).json({
        success: false,
        msg: "No Record Found",
      });
    } else {
      res.status(200).json({
        success: true,
        recharge: recharge,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.createAdjust = async (req, res, next) => {
  try {
    req.body.id = new ObjectID().toHexString();
    const id = req.body.id;
    req.body.docType = "adjustment";
    const consumerData = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        AccountNumber: req.params.accountNo,
      }),
      "consumer"
    );
    if (consumerData[0]) {
      await Gateway.submitTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "CreateData",
        JSON.stringify(req.body)
      );
      const savedAdjust = await Gateway.evaluateTransaction(
        req.params.org,
        req.params.appUserId,
        req.params.channelName,
        req.params.chaincodeName,
        "Find",
        JSON.stringify({
          id: id,
        }),
        "adjustment"
      );

      res.status(201).json({
        success: true,
        savedAdjust: savedAdjust[0],
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

exports.getAdjust = async (req, res, next) => {
  try {
    console.log(req.body, "req.body");
    let obj = req.body;
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === "") {
        delete obj[propName];
      }
    }
    console.log(obj, "req.body");
    const adjustment = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify(obj),
      "adjustment"
    );
    if (!adjustment) {
      res.status(400).json({
        success: false,
        msg: "No Record Found",
      });
    } else {
      res.status(200).json({
        success: true,
        adjustment: adjustment,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteConsumer = async (req, res, next) => {
  try {
    // put req.body into  update function and send back to client
    await Gateway.deleteTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "DeleteAsset",
      req.params.accountNo
    );
    res.json({
      msg: "Item Deleted",
    });
  } catch (error) {
    next(error);
  }
};
