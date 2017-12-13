import { runGraphQL } from './graphql/lib';

const getShoppingPaths = (event, context, callback) => {
    // const response = {
    //     statusCode: 200,
    //     headers: {
    //         "Access-Control-Allow-Origin": "*" // Required for CORS support to work
    //     },
    //     body: JSON.stringify({
    //         shoppingLists: 'Yet to implement',
    //         input: event,
    //     }),
    // };
    
    runGraphQL(event, (error, response) => {
        callback(error, response);
    });
}

export { getShoppingPaths };