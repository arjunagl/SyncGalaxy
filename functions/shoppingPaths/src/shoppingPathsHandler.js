import { runGraphQL } from './graphql/lib';

const getShoppingPaths = (event, context, callback) => {
    runGraphQL(event, (error, result) => {
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*" // Required for CORS support to work
            },
            body: JSON.stringify({
                data: {
                    ShoppingPaths: result.data.ShoppingPaths,
                    input: event,
                }
            }),
        };
        callback(error, response);
    });

    // const response = {
    //     statusCode: 200,
    //     headers: {
    //         'Access-Control-Allow-Origin': "*" // Required for CORS support to work,
    //     },
    //     body: JSON.stringify({
    //         data: {
    //             ShoppingPaths: 'result.data.ShoppingPaths',
    //             input: event,
    //         }
    //     }),
    // };
    // callback(null, response);
}

const getOptions = (event, context, callback) => {
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': "*", // Required for CORS support to work,
            'Access-Control-Allow-Headers': 'content-type',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
        },
        body: JSON.stringify({
            Options: 'Options'
        }),
    };
    callback(null, response);
}

export { getShoppingPaths, getOptions };