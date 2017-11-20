'use strict';
// import 'aws-sdk/dist/aws-sdk';
const AWS = require("aws-sdk");
import { SampleStores } from './sampleData';

module.exports.get = (event, context, callback) => {
  console.log('table name');
  const tableName = process.env.StoresTable;

  AWS.config.update({ region: process.env.AWS_DEFAULT_REGION });

  // DynamoDB configuration
  var docClient = new AWS.DynamoDB.DocumentClient();


  var params = {
    TableName: process.env.StoresTable,
    ProjectionExpression: "#StoreId, Hours, #StoreLocation, #StoreName",
    ExpressionAttributeNames: {
      "#StoreId": "Id",
      "#StoreLocation": "Location",
      "#StoreName": "Name",
    }
  };


  console.log("Scanning Stores table.");
  docClient.scan(params, (err, stores) => {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Scan succeeded.");

      // S3 client configuration
      var s3 = new AWS.S3();
      let s3BucketParams = {
        Bucket: process.env.S3_BUCKET,
        Key: ''
      };

      stores.Items.forEach((store) => {
        console.log(`Loading image for: ${store.Name}`);
        s3BucketParams.Key = `${store.Name}.svg`;
        s3.getObject(params, (err, data) => {
          if (err) {
            console.log(err, err.stack);
          } // an error occurred
          else {
            console.log(data);
          }
        });
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


