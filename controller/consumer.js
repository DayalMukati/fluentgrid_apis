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

exports.getBill = async (req, res, next, accountNo) => {
  try {
    console.log(req.body);
    const bill = await Gateway.evaluateTransaction(
      req.params.org,
      req.params.appUserId,
      req.params.channelName,
      req.params.chaincodeName,
      "Find",
      JSON.stringify({
        AccountNumber: accountNo,
        MeterNo: req.body.MeterNo || "",
        BillingDate: req.body.BillingDate || ""
      }),
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
