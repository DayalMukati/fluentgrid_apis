 /*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

 const enrollAdmin = require('./../auth/enrollAdmin');
 const registerUser = require('./../auth/registerUser');

 exports.getAdminById = async (req, res, next, org) => {
    try {
    //   const ctu = await Gateway.evaluateTransaction(
    //     "Find",
    //     JSON.stringify({
    //       Name: name,
    //     }),
    //     "ctu"
    //   );
    //   req.ctu = ctu[0];
      next();
    } catch (error) {
      next(error);
    }
  };
exports.enrollAdmin = async (req, res, next, org) => {
    let response;
    try{
        console.log(org, "org")
        response = await enrollAdmin(org);
    if (response && response.success) {
        console.log(`Enroll was Success: ${response.message}`);
        res.status(200).json(response);

    } else {
        console.log(`Enroll was Failure: ${response.message}`);
        res.status(401).json(response);
        return;
    }
    }catch(error) {
		next(error)
	}
    

};

exports.registerUser = async (req, res, next, orgName) => {
    let response;
    console.log(req.body, "req.boday")
   try{
    response = await registerUser(orgName, req.body.userId, req.body.userAffiliation);
    if (response && response.success) {

        console.log(`Enroll was Success: ${response.message}`);
        res.status(200).json(response);

    } else {
        console.log(`Enroll was Failure: ${response.message}`);
        res.status(401).json(response);
        return;
    }
   }catch(error) {
		next(error)
	}
        
};
  