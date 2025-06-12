/* eslint-disable */
const checker = require('license-checker');
const core = require('@actions/core');
const AWS = require('aws-sdk');

const credentials = new AWS.Credentials({accessKeyId:
  process.env.AWS_ACCESS_KEY_ID, secretAccessKey:
    process.env.AWS_SECRET_ACCESS_KEY});
AWS.config.credentials = credentials;
AWS.config.region = process.env.AWS_REGION;

const SSM = new AWS.SSM();

const getSecret = () => new Promise( (resolve, reject) => {
  const params = {
    Name: '/LICENSE_CHECKER/ALLOWED_LICENSES',
    WithDecryption: true,
  };
  SSM.getParameter(params, (err, data) => {
    if (err) {
      reject({status: false, error: err});
    } else {
      resolve({status: true, response: data});
    }
  });
});

checker.init({start: './'}, async (err, packages) => {
  if (err) {
    console.log(`error in checking: ${  JSON.stringify(err)}`);
    core.setFailed(err.message);
  } else {
    console.log('Checking for all specified licenses');
    try {
      // Fetch the list of allowed licenses from Parameter Store
      const ssmResult = await getSecret();
      if (!ssmResult.status || !ssmResult.response) {
        core.setFailed('Failed to get details from Parameter Store');
        return;
      }
      // Create a set of all allowed Licenses
      const allAllowedLicenses = new Set(
          ssmResult.response.Parameter.Value.split(','));
      const packageModules = Object.keys(packages);
      const failureSet = new Set();
      for (const module of packageModules) {
        const moduleInfo = packages[module];
        if (!allAllowedLicenses.has(moduleInfo.licenses)) {
          console.log(`License not allowed: Module: ${  module  } License: ${ 
            moduleInfo.licenses}`);
          failureSet.add(module);
        }
      }
      const notAllowedModules = Array.from(failureSet);
      if (!notAllowedModules.length == false) {
        core.setFailed(`Some modules are not allowed: ${  notAllowedModules}`);
        return;
      }
      core.setOutput('Result', 'All modules are allowed');
    } catch (err) {
      console.log(`Error encountered: ${  JSON.stringify(err)}`);
      core.setFailed(err.message);
    }
  }
});