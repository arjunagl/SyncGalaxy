export const getOptions = (_event, _context, callback) => {
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work,
            'Access-Control-Allow-Headers': 'content-type',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
        },
        body: JSON.stringify({
            Options: 'Options'
        }),
    };
    callback(null, response);
};

import { graphqlLambda, graphiqlLambda } from 'apollo-server-lambda';
import userSchema from './graphql/schemas/userSchema';

export const graphqlHandler = graphqlLambda({ schema: userSchema });
export const graphiqlHandler = graphiqlLambda({
    endpointURL: '/Prod/graphql',
});