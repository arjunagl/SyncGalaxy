import { runGraphQL } from './graphql/lib';

const getShoppingPaths = (event, context, callback) => {
    // runGraphQL(event, (error, result) => {
    //     const response = {
    //         statusCode: 200,
    //         headers: {
    //             "Access-Control-Allow-Origin": "*" // Required for CORS support to work
    //         },
    //         body: JSON.stringify({
    //             ShoppingPaths: result.data.ShoppingPaths,
    //             input: event,
    //         }),
    //     };
    //     callback(error, response);
    // });

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*" // Required for CORS support to work
        },
        body: JSON.stringify({
            ShoppingPaths: 'result.data.ShoppingPaths',
            input: event,
        }),
    };
    callback(null, response);
}

export { getShoppingPaths };