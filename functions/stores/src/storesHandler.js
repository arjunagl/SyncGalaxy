const AWS = require("aws-sdk");

const getStores = (event, context, callback) => {
  const tableName = process.env.StoresTable;
  console.log(`tableName = ${tableName}`);

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

  docClient.scan(params, (err, stores) => {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Scan succeeded.");

      // S3 client configuration
      var s3 = new AWS.S3({ apiVersion: '2006-03-01' });
      let s3BucketParams = {
        Bucket: process.env.S3_BUCKET,
        Key: ''
      };

      let imageLoads = [];
      stores.Items.forEach((store) => {
        s3BucketParams.Key = `${store.Name.toLowerCase()}.svg`;
        imageLoads.push(new Promise((resolve, reject) => {
          s3.getObject(s3BucketParams, (err, data) => {
            if (err) {
              console.log(err, err.stack);
            } // an error occurred
            else {
              store.Image = data.Body;
              resolve();
            }
          });
        }));
      });

      Promise.all(imageLoads).then(() => {
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*" // Required for CORS support to work
          },
          body: JSON.stringify({
            stores: stores.Items,
            input: event,
          }),
        };

        callback(null, response);
      });

    }
  });
};

export { getStores };