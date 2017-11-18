'use strict';
// import 'aws-sdk/dist/aws-sdk';
const AWS = require("aws-sdk");
import { SampleStores } from './sampleData';

module.exports.get = (event, context, callback) => {
  console.log('table name');
  const tableName = process.env.StoresTable;

  // const AWS = window.AWS;
  AWS.config.update({ region: process.env.AWS_DEFAULT_REGION });
  var docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: process.env.StoresTable,
    ProjectionExpression: "#StoreId, Hours, #StoreLocation, #StoreName",
    ExpressionAttributeNames: {
      "#StoreId": "Id",
      "#StoreLocation":"Location",
      "#StoreName":"Name",
    }
  };


  console.log("Scanning Stores table.");
  docClient.scan(params, (err, stores) => {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Scan succeeded.");
      stores.Items.forEach((store) => {
        console.log(store.Name);
      });

      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*" // Required for CORS support to work
        },
        body: JSON.stringify({
          stores: stores,
          input: event,
        }),
      };

      callback(null, response);
    }
  });
};


