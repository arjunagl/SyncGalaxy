const AWS = require("aws-sdk");

const getShoppingLists = (event, context, callback) => {

    const docClient = new AWS.DynamoDB.DocumentClient();
    let tableQueryParams = null;

    if ((typeof event.pathParameters !== 'undefined') && (event.pathParameters !== null) && (event.pathParameters.user !== null)) {
        tableQueryParams = {
            TableName: process.env.ShoppingListsTable,
            FilterExpression: '#User = :filterUser',
            ExpressionAttributeNames: {
                '#User': 'User'
            },
            ExpressionAttributeValues: {
                ':filterUser': event.pathParameters.user.trim().toLowerCase()
            }
        }
    }

    docClient.scan(tableQueryParams, (err, shoppingLists) => {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Scan succeeded.");

            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*" // Required for CORS support to work
                },
                body: JSON.stringify({
                    shoppingLists: shoppingLists.Items,
                    input: event,
                }),
            };
            callback(null, response);
        };
    });


}

export { getShoppingLists };