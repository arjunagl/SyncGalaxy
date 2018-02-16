import { graphql } from 'graphql';
import ShoppingPathSchema from './schemas/ShoppingPathSchema';

export function runGraphQL(event, cb) {
    let query = event.query;
    if (event.queryStringParameters && event.queryStringParameters.query) {
        query = event.queryStringParameters.query.replace("\n", ' ', "g");
    }

    graphql(ShoppingPathSchema, query).then(function (result) {
        console.log(`graphql event response = ${JSON.stringify(result)}`);
        return cb(null, result);
    });

}
