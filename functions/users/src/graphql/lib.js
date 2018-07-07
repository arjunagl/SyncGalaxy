import { graphql } from 'graphql';
import ShoppingPathSchema from './schemas/ShoppingPathSchema';

export function runGraphQL(query, cb) {
    graphql(ShoppingPathSchema, query).then(function (result) {
        console.log(`graphql event response = ${JSON.stringify(result)}`);
        return cb(null, result);
    });

}
