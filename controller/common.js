const ObjectID = require("bson-objectid");
const Gateway = require("../utils/gateway");
var moment = require('moment');

exports.postLosscharge = async (req, res, next) => {
  try {
    req.body.id = new ObjectID().toHexString();
    const id = req.body.id;
    req.body.docType = req.query.entity + "losscharge";
    const lossData = await Gateway.evaluateTransaction(
      req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
      "Find",
      JSON.stringify({
        Name: req.body.Name,
      }),
      req.query.entity
    );
    if (lossData[0]) {
      await Gateway.submitTransaction(
        req.query.org,
        req.query.appUserId,
        req.query.channelName,
        req.query.chaincodeName,
        "CreateData",
        JSON.stringify(req.body)
      );
      const savedLoss = await Gateway.evaluateTransaction(
        req.query.org,
        req.query.appUserId,
        req.query.channelName,
        req.query.chaincodeName,
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
      req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
      "Find",
      JSON.stringify(obj),
      req.query.entity + "losscharge"
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
    req.body.docType = req.query.entity + "outage";
    const outageData = await Gateway.evaluateTransaction(
      req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
      "Find",
      JSON.stringify({
        Name: req.body.Name,
      }),
      req.query.entity
    );
    if (outageData[0]) {
      await Gateway.submitTransaction(
        req.query.org,
        req.query.appUserId,
        req.query.channelName,
        req.query.chaincodeName,
        "CreateData",
        JSON.stringify(req.body)
      );
      const savedOutage = await Gateway.evaluateTransaction(
        req.query.org,
        req.query.appUserId,
        req.query.channelName,
        req.query.chaincodeName,
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
      req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
      "Find",
      JSON.stringify(obj),
      req.query.entity + "outage"
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
      req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
      "Find",
      JSON.stringify({
        OrganizationName: req.body.OrganizationName,
      }),
      "wallet"
    );
    if (!walletData[0]) {
      await Gateway.submitTransaction(
        req.query.org,
        req.query.appUserId,
        req.query.channelName,
        req.query.chaincodeName,
        "CreateData",
        JSON.stringify(wallet)
      );
      const savedWallet = await Gateway.evaluateTransaction(
        req.query.org,
        req.query.appUserId,
        req.query.channelName,
        req.query.chaincodeName,
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
      req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
      "Find",
      JSON.stringify({
        OrganizationName: req.body.OrganizationName
      }),
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
    let text = req.body.Time;
    const dateArray = text.split(" ")
    let data = {
      ...req.body,
      id: new ObjectID().toHexString(),
      docType: "DSM1",
      Date: dateArray[0]
    };

    console.log(data, "Query")
    await Gateway.submitTransaction(
      req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
      "CreateData",
      JSON.stringify(data)
    );
    const savedData = await Gateway.evaluateTransaction(
      req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
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
    let text = req.body.Time;
    const dateArray = text.split(" ")
    let data = {
      ...req.body,
      id: new ObjectID().toHexString(),
      docType: "DSM2",
      Date: dateArray[0]
    };
    await Gateway.submitTransaction(
      req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
      "CreateData",
      JSON.stringify(data)
    );
    const savedData = await Gateway.evaluateTransaction(
      req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
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
    let obj = {
      NMAId: req.query.NMAId,
      Date: req.query.date
    }
    // for (var propName in obj) {
    //   if (obj[propName] === null || obj[propName] === "") {
    //     delete obj[propName];
    //   }
    // }
    console.log(obj, "req.body");
    const data = await Gateway.evaluateTransaction(
      req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
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
    let obj = {
      NMAId: req.query.NMAId,
      Date: req.query.date
    }
    // for (var propName in obj) {
    //   if (obj[propName] === null || obj[propName] === "") {
    //     delete obj[propName];
    //   }
    // }
    console.log(obj, "req.body");
    const data = await Gateway.evaluateTransaction(
      req.query.org,
      req.query.appUserId,
      req.query.channelName,
      req.query.chaincodeName,
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

async function calculateBill(AccountNumber, date, org, appUserId, channelName, chaincodeName) {
  try {
    console.log(AccountNumber, date)
    const consumer = await Gateway.evaluateTransaction(
      org,
      appUserId,
      channelName,
      chaincodeName,
      "Find",
      JSON.stringify({
        AccountNumber: AccountNumber,
      }),
      "consumer"
    );
    if (consumer[0]) {
      let data;
      data = {
        id: new ObjectID().toHexString(),
        CTU: consumer[0].ConsumerPackDetails[0].DeliveryPath.CTU,
        STU: consumer[0].ConsumerPackDetails[0].DeliveryPath.STU,
        NMA: consumer[0].ConsumerPackDetails[0].DeliveryPath.NMA,
        GENCO: consumer[0].ConsumerPackDetails[0].DeliveryPath.GENCO,
        date: date,
        AccountNumber: AccountNumber
      }

      //Get NMA Charges
      if (consumer[0].ConsumerPackDetails[0].DeliveryPath.NMA) {
        let nmaCharges = await Gateway.evaluateTransaction(
          org,
          appUserId,
          channelName,
          chaincodeName,
          "Find",
          JSON.stringify({
            Name: data.NMA
          }),
          "nmalosscharge"
        );
        if (Array.isArray(nmaCharges) && nmaCharges.length > 0) {
          console.log("inside")
          const nma = nmaCharges.reduce((a, b) => a.ToDate > b.ToDate ? a : b);
          data.nmaCharge = nma.Charges;
        }

        let nmaWallet = await Gateway.evaluateTransaction(
          org,
          appUserId,
          channelName,
          chaincodeName,
          "Find",
          JSON.stringify({
            OrganizationName: data.NMA
          }),
          "wallet"
        );
        data.nmaWallet = nmaWallet[0].id;
      }
      //Get CTU Charges
      if (consumer[0].ConsumerPackDetails[0].DeliveryPath.CTU) {
        let ctuCharges = await Gateway.evaluateTransaction(
          org,
          appUserId,
          channelName,
          chaincodeName,
          "Find",
          JSON.stringify({
            Name: data.CTU
          }),
          "ctulosscharge"
        );

        if (Array.isArray(ctuCharges) && ctuCharges.length > 0) {
          console.log("inside")
          const ctu = ctuCharges.reduce((a, b) => a.ToDate > b.ToDate ? a : b);
          data.ctuCharge = ctu.Charges;
        }

        let ctuWallet = await Gateway.evaluateTransaction(
          org,
          appUserId,
          channelName,
          chaincodeName,
          "Find",
          JSON.stringify({
            OrganizationName: data.CTU
          }),
          "wallet"
        );
        data.ctuWallet = ctuWallet[0].id;
      }
      //Get STU Charges
      if (consumer[0].ConsumerPackDetails[0].DeliveryPath.STU) {
        let stuCharges = await Gateway.evaluateTransaction(
          org,
          appUserId,
          channelName,
          chaincodeName,
          "Find",
          JSON.stringify({
            Name: data.STU
          }),
          "stulosscharge"
        );
        if (Array.isArray(stuCharges) && stuCharges.length > 0) {
          console.log("inside")
          const stu = stuCharges.reduce((a, b) => a.ToDate > b.ToDate ? a : b);
          data.stuCharge = stu.Charges;
        }

        let stuWallet = await Gateway.evaluateTransaction(
          org,
          appUserId,
          channelName,
          chaincodeName,
          "Find",
          JSON.stringify({
            OrganizationName: data.STU
          }),
          "wallet"
        );
        data.stuWallet = stuWallet[0].id;
      }

      //Get Billing Data
      let billData = await Gateway.evaluateTransaction(
        org,
        appUserId,
        channelName,
        chaincodeName,
        "Find",
        JSON.stringify({
          AccountNumber: req.body.AccountNumber,
          BillingDate: req.body.date
        }),
        "dailybill"
      );
      data.billedUnits = billData[0].BilledUnits
      data.TotalCharge = billData[0].TotalCharge

      let gencoWallet = await Gateway.evaluateTransaction(
        org,
        appUserId,
        channelName,
        chaincodeName,
        "Find",
        JSON.stringify({
          OrganizationName: data.GENCO
        }),
        "wallet"
      );
      data.gencoWallet = gencoWallet[0].id;
      console.log(data, "data")

      await Gateway.submitTransaction(
        org,
        appUserId,
        channelName,
        chaincodeName,
        "billSettel",
        JSON.stringify(data)
      );

      const savedData = await Gateway.evaluateTransaction(
        org,
        appUserId,
        channelName,
        chaincodeName,
        "Find",
        JSON.stringify({
          id: data.id,
        }),
        "billsettel"
      );

      res.status(201).json({
        success: true,
        savedData: savedData[0],
      });
    } else {
      res.status(400).json({
        success: false,
        meg: "Record not Found",
      });
    }
  } catch (error) {

  }

}

exports.calculationCron = async (data) => {
  try {
    console.log(data, "data")
    let consumers = await Gateway.evaluateTransaction(
      data.org,
      data.appUserId,
      data.channelName,
      data.chaincodeName,
      "GetAll",
      "consumer"
    );
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
    const currentMoment = moment().subtract(6, 'days');
    const endMoment = moment().add(1, 'days');
    while (currentMoment.isBefore(endMoment, 'day')) {

      consumers.forEach(async (consumer) => {
        let AccountNumber = consumer.AccountNumber;
        let date = currentMoment.format('MM/DD/YYYY');

        await calculateBill(AccountNumber, date, data.org, data.appUserId, data.channelName, data.chaincodeName);

      });
      currentMoment.add(1, 'days');
      await sleep(2000)

    }

  } catch (error) {

    return error
  }
}