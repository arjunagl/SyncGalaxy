// import { runGraphQL } from './graphql/lib';
// var server = require('apollo-server-lambda');
import { graphqlLambda } from 'apollo-server-lambda';
import ShoppingPathSchema from './graphql/schemas/ShoppingPathSchema';

const getShoppingPaths = (event, context, callback) => {
    console.log('Loading shopping paths');
    const handler = graphqlLambda({ schema: ShoppingPathSchema });
    return handler(event, context, (error, output) => {
        output.headers['Access-Control-Allow-Origin'] = '*';
        callback(error, output);
    });
    // const query = event.body.query;
    // console.log(`EventData = ${JSON.stringify(event)}, query = ${query}`);
    // runGraphQL(query, (error, result) => {
    //     const response = {
    //         statusCode: 200,
    //         headers: {
    //             "Access-Control-Allow-Origin": "*" // Required for CORS support to work
    //         },
    //         body: JSON.stringify({
    //             data: {
    //                 ShoppingPaths: result.data.ShoppingPaths,
    //                 input: event,
    //             }
    //         }),
    //     };
    //     callback(error, response);
    // });

    //------------------------------------------------------------------------------------------

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