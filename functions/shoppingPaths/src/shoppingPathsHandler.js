const AWS = require("aws-sdk");

const getShoppingPaths = (event, context, callback) => {
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*" // Required for CORS support to work
        },
        body: JSON.stringify({
            shoppingLists: 'Yet to implement',
            input: event,
        }),
    };
    callback(null, response);
}

export { getShoppingPaths };