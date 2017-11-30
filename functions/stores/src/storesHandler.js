const AWS = require("aws-sdk");

const getStores = (event, context, callback) => {
  AWS.config.update({ region: process.env.AWS_DEFAULT_REGION });

  // DynamoDB configuration
  const docClient = new AWS.DynamoDB.DocumentClient();
  let tableQueryParams = null;
  if ((typeof event.pathParameters !== 'undefined') && (event.pathParameters !== null) && (event.pathParameters.storeName !== null)) {
    tableQueryParams = {
      TableName: process.env.StoresTable,
      FilterExpression: 'contains(#StoreName, :filterStoreName)',
      ExpressionAttributeNames: {
        '#StoreName': 'Name'
      },
      ExpressionAttributeValues: {
        ':filterStoreName': event.pathParameters.storeName
      }
    }
  } else {
    tableQueryParams = {
      TableName: process.env.StoresTable
    }
  }

  docClient.scan(tableQueryParams, (err, stores) => {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Scan succeeded.");

      // S3 client configuration
      var s3 = new AWS.S3({ apiVersion: '2006-03-01' });      

      let imageLoads = [];
      stores.Items.forEach((store) => {
        imageLoads.push(new Promise((resolve) => {
          s3.getObject({
            Bucket: process.env.S3_BUCKET,
            Key: `${store.Name.toLowerCase()}.svg`
          }, (err, data) => {
            if (err) {
              console.log(err);
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