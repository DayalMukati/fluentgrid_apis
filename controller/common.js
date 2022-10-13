const ObjectID = require("bson-objectid");
const Gateway = require("../utils/gateway");

exports.postLosscharge = async (req, res, next) => {
    try {
      req.body.id = new ObjectID().toHexString();
      const id = req.body.id;
      req.body.docType = req.params.entity;
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
        req.params.entity
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