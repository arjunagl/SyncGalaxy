const AWS = require("aws-sdk");
import _head from 'lodash/head';

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

const getShoppingPath = (shoppingPathId, callback) => {
    console.log(`Getting shopping path for shopping path id = ${shoppingPathId}`);
    AWS.config.update({ region: process.env.AWS_DEFAULT_REGION });
    const docClient = new AWS.DynamoDB.DocumentClient();
    const tableQueryParams = {
        TableName: process.env.ShoppingPathsTable,
        FilterExpression: 'contains(#shoppingPathId, :filterShoppingPathId)',
        ExpressionAttributeNames: {
            '#shoppingPathId': 'Id'
        },
        ExpressionAttributeValues: {
            ':filterShoppingPathId': shoppingPathId
        }
    }

    docClient.scan(tableQueryParams, (err, shoppingPaths) => {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            callback(err);
        }
        //The items have to be converted to an array
        var shoppingPath = _head(shoppingPaths.Items);
        if (shoppingPath) {
            shoppingPath.shoppingItems = JSON.parse(shoppingPath.shoppingItems);
        }
        console.log(`Successfully loaded shopping paths for shoppingPathId = ${shoppingPathId} with shopping paths ${JSON.stringify(shoppingPath)}`);
        callback(null, shoppingPath);
    });
}

export { getShoppingPathsForUser, getShoppingPath };
