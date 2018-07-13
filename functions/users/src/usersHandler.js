import { graphqlLambda } from 'apollo-server-lambda';
import UserSchema from './graphql/schemas/userSchema';

const registerUser = (event, context, callback) => {
    console.log('Registering user...')
    const handler = graphqlLambda({ schema: UserSchema });
    return handler(event, context, (error, output) => {
        output.headers['Access-Control-Allow-Origin'] = '*';
        callback(error, output);
    });
}

const getOptions = (event, context, callback) => {
    console.log('getting options');
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

export { registerUser, getOptions };