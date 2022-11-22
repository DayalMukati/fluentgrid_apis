const {
    calculationCron: calculationCron
} = require("../controller/common")


exports.channelOnecron = async () => {
    let data = {
        org: "MUL",
        appUserId: "MulUser",
        channelName: "channelone",
        chaincodeName: "chaincode1"
    }
    await calculationCron(data);

}

exports.channelTwocron = async () => {
    let data = {
        org: "MUL",
        appUserId: "MulUser",
        channelName: "channeltwo",
        chaincodeName: "chaincode2"
    }
    await calculationCron(data);

}

exports.channelThreecron = async () => {
    let data = {
        org: "MUL",
        appUserId: "MulUser",
        channelName: "channelthree",
        chaincodeName: "chaincode3"
    }
    await calculationCron(data);

}

exports.channelFourcron = async () => {
    let data = {
        org: "MUL",
        appUserId: "MulUser",
        channelName: "channelfour",
        chaincodeName: "chaincode4"
    }
    await calculationCron(data);

}

exports.channelFivecron = async () => {
    let data = {
        org: "MUL",
        appUserId: "MulUser",
        channelName: "channelfive",
        chaincodeName: "chaincode5"
    }
    await calculationCron(data);

}

exports.channelSixcron = async () => {
    let data = {
        org: "MUL",
        appUserId: "MulUser",
        channelName: "channelsix",
        chaincodeName: "chaincode6"
    }
    await calculationCron(data);

}

exports.channelSevencron = async () => {
    let data = {
        org: "MUL",
        appUserId: "MulUser",
        channelName: "channelseven",
        chaincodeName: "chaincode7"
    }
    await calculationCron(data);

}

exports.channelEightcron = async () => {
    let data = {
        org: "MUL",
        appUserId: "MulUser",
        channelName: "channeleight",
        chaincodeName: "chaincode8"
    }
    await calculationCron(data);

}
exports.channelNinecron = async () => {
    let data = {
        org: "MUL",
        appUserId: "MulUser",
        channelName: "channelnine",
        chaincodeName: "chaincode9"
    }
    await calculationCron(data);

}