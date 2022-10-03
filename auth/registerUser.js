/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const {
    Wallets
} = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const {
    buildCAClient,
    registerAndEnrollUser
} = require('../utils/CAUtil.js');
const {
    buildCCP,
    buildWallet
} = require('../utils/AppUtil.js');

const mspOrg1 = 'UBAMSP';
const walletPath = path.join(__dirname, '../wallet');

async function registerUser(org, userId, affiliation) {

    let response;
    let orgMSP;
    let caURL;
    try {
        switch (org) {
            case "MUL":
              (orgMSP = "MULMUNDRAMSP"), (caURL = "ca.mulmundra.mpower.in");
              break;
            case "AEML":
              (orgMSP = "AEMLMUMBAIMSP"), (caURL = "ca.aemlmumbai.mpower.in");
              break;
            case "JVVNL":
              (orgMSP = "JVVNLMSP"), (caURL = "ca.jvvnljaipur.mpower.in");
              break;
            case "APRLKAWAI":
              (orgMSP = "APRLKAWAIMSP"), (caURL = "ca.aprlkawai.mpower.in");
              break;
            case "APMLTIRODA":
              (orgMSP = "APMLTIRODAMSP"), (caURL = "ca.apmltiroda.mpower.in");
              break;
            case "APMLMUNDRA":
              (orgMSP = "APMLMUNDRAMSP"), (caURL = "ca.apmlmundra.mpower.in");
              break;
            case "GETCO":
              (orgMSP = "GETCOMSP"), (caURL = "ca.getco.mpower.in");
              break;
            case "RRVPNL":
              (orgMSP = "RRVPNLMSP"), (caURL = "ca.rrvpnl.mpower.in");
              break;
            case "PGCIL":
              (orgMSP = "PGCILMSP"), (caURL = "ca.pgcil.mpower.in");
              break;
            case "MSETCL":
              (orgMSP = "MSETCLMSP"), (caURL = "ca.msetcl.mpower.in");
              break;
            case "GUJSLDC":
              (orgMSP = "GUJSLDCMSP"), (caURL = "ca.gujaratsldc.mpower.in");
              break;
            case "MAHASLDC":
              (orgMSP = "MAHASLDCMSP"), (caURL = "ca.maharastrasldc.mpower.in");
              break;
            case "RAJSLDC":
              (orgMSP = "RAJSLDCMSP"), (caURL = "ca.rajasthansldc.mpower.in");
              break;
            case "WESTRLDC":
              (orgMSP = "WESTRLDCMSP"), (caURL = "ca.westernrldc.mpower.in");
              break;
            case "NORTHRLDC":
              (orgMSP = "NORTHRLDCMSP"), (caURL = "ca.northernrldc.mpower.in");
              break;
          }
        // build an in memory object with the network configuration (also known as a connection profile)
        const ccp = buildCCP(org);

        // build an instance of the fabric ca services client based on
        // the information in the network configuration
        const caClient = buildCAClient(FabricCAServices, ccp, caURL);

        // setup the wallet to hold the credentials of the application user
        const wallet = await buildWallet(Wallets, walletPath);

        // in a real application this would be done only when a new user was required to be added
        // and would be part of an administrative flow
        await registerAndEnrollUser(caClient, wallet, orgMSP, userId, affiliation, org);

        response = {
            success: true,
            message: `Successfully enrolled client user ${userId} and imported it into the wallet`
        };
    } catch (error) {
        console.error(`******** FAILED to run the application: ${error}`);
        response = {
            success: false,
            message: `${error}`
        };
    }

    return response;
}

module.exports = registerUser;
//registerHDFCUser('calvin', 'hdfclife.department1');
//registerHDFCUser('operator1','hdfc.operator');