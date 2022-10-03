/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const fs = require("fs");
const path = require("path");

exports.buildCCP = (org) => {
  console.log(org);
  let ccpPath;
  switch (org) {
    case "MUL":
      ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "FluentGrid_POC",
        "mpower-network",
        "organizations",
        "peerOrganizations",
        "mulmundra.mpower.in",
        "connection-mulmundra.json"
      );
      break;
    case "AEML":
      ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "FluentGrid_POC",
        "mpower-network",
        "organizations",
        "peerOrganizations",
        "aemlmumbai.mpower.in",
        "connection-aemlmumbai.json"
      );
      break;
    case "JVVNL":
      ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "FluentGrid_POC",
        "mpower-network",
        "organizations",
        "peerOrganizations",
        "jvvnljaipur.mpower.in",
        "connection-jvvnljaipur.json"
      );
      break;
    case "APRLKAWAI":
      ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "FluentGrid_POC",
        "mpower-network",
        "organizations",
        "peerOrganizations",
        "aprlkawai.mpower.in",
        "connection-aprlkawai.json"
      );
      break;
    case "APMLTIRODA":
      ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "FluentGrid_POC",
        "mpower-network",
        "organizations",
        "peerOrganizations",
        "apmltiroda.mpower.in",
        "connection-apmltiroda.json"
      );
      break;
    case "APMLMUNDRA":
      ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "FluentGrid_POC",
        "mpower-network",
        "organizations",
        "peerOrganizations",
        "apmlmundra.mpower.in",
        "connection-apmlmundra.json"
      );
      break;
    case "GETCO":
      ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "FluentGrid_POC",
        "mpower-network",
        "organizations",
        "peerOrganizations",
        "getco.mpower.in",
        "connection-getco.json"
      );
      break;
    case "PGCIL":
      ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "FluentGrid_POC",
        "mpower-network",
        "organizations",
        "peerOrganizations",
        "pgcil.mpower.in",
        "connection-pgcil.json"
      );
      break;
    case "RRVPNL":
      ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "FluentGrid_POC",
        "mpower-network",
        "organizations",
        "peerOrganizations",
        "rrvpnl.mpower.in",
        "connection-rrvpnl.json"
      );
      break;
    case "MSETCL":
      ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "FluentGrid_POC",
        "mpower-network",
        "organizations",
        "peerOrganizations",
        "msetcl.mpower.in",
        "connection-msetcl.json"
      );
      break;
    case "GUJSLDC":
      ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "FluentGrid_POC",
        "mpower-network",
        "organizations",
        "peerOrganizations",
        "gujaratsldc.mpower.in",
        "connection-gujaratsldc.json"
      );
      break;
    case "MAHASLDC":
      ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "FluentGrid_POC",
        "mpower-network",
        "organizations",
        "peerOrganizations",
        "maharastrasldc.mpower.in",
        "connection-maharastrasldc.json"
      );
      break;
    case "RAJSLDC":
      ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "FluentGrid_POC",
        "mpower-network",
        "organizations",
        "peerOrganizations",
        "rajasthansldc.mpower.in",
        "connection-rajasthansldc.json"
      );
      break;

    case "WESTRLDC":
      ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "FluentGrid_POC",
        "mpower-network",
        "organizations",
        "peerOrganizations",
        "westernrldc.mpower.in",
        "connection-westernrldc.json"
      );
      break;

    case "NORTHRLDC":
      ccpPath = path.resolve(
        __dirname,
        "..",
        "..",
        "FluentGrid_POC",
        "mpower-network",
        "organizations",
        "peerOrganizations",
        "northernrldc.mpower.in",
        "connection-northernrldc.json"
      );
      break;
  }
  const fileExists = fs.existsSync(ccpPath);
  if (!fileExists) {
    throw new Error(`no such file or directory: ${ccpPath}`);
  }
  const contents = fs.readFileSync(ccpPath, "utf8");

  // build a JSON object from the file contents
  const ccp = JSON.parse(contents);

  console.log(`Loaded the network configuration located at ${ccpPath}`);
  return ccp;
};

exports.buildWallet = async (Wallets, walletPath) => {
  // Create a new  wallet : Note that wallet is for managing identities.
  let wallet;
  if (walletPath) {
    wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Built a file system wallet at ${walletPath}`);
  } else {
    wallet = await Wallets.newInMemoryWallet();
    console.log("Built an in memory wallet");
  }

  return wallet;
};

exports.prettyJSONString = (inputString) => {
  if (inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
  } else {
    return inputString;
  }
};
