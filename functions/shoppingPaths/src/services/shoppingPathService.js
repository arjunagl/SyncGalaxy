const AWS = require("aws-sdk");

const getShoppingPathsForUser = (userId, callback) => {
    console.log(`Loading shopping paths for user ${userId}`);
    AWS.config.update({ region: process.env.AWS_DEFAULT_REGION });
    const docClient = new AWS.DynamoDB.DocumentClient();
    const tableQueryParams = {
        TableName: process.env.ShoppingPathsTable,
        FilterExpression: 'contains(#UserId, :filterUserId)',
        ExpressionAttributeNames: {
            '#UserId': 'userId'
        },
        ExpressionAttributeValues: {
            ':filterUserId': userId
        }
    }

    docClient.scan(tableQueryParams, (err, shoppingPaths) => {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            callback(err);
        }
        console.log(`Successfully loaded shopping paths for userid = ${userId} with shopping paths ${JSON.stringify(shoppingPaths.Items.length)}`);
        callback(null, shoppingPaths.Items);
    });
}

export { getShoppingPathsForUser };
