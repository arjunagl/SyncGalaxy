import { graphql } from 'graphql';
import ShoppingPathSchema from './schemas/ShoppingPathSchema';

export function runGraphQL(event, cb) {

    let query = event.query;    
    if (event.query && event.query.hasOwnProperty('query')) {
        query = event.query.query.replace("\n", ' ', "g");
    }

    graphql(ShoppingPathSchema, query).then(function (result) {        
        return cb(null, result);
    });

}
