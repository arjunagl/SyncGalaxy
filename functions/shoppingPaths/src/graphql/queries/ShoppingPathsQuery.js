import { GraphQLObjectType, GraphQLString } from 'graphql';
import ShoppingPathType from '../types/ShoppingPathType';
import { getShoppingPathsForUser } from '../../services/shoppingPathService';

const ShoppingPathQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        ShoppingPath: {
            type: ShoppingPathType,
            args: {
                userId: { type: GraphQLString }
            },
            // resolve: function (_, { userId }) {
            //     console.log('resolving...');
            //     getShoppingPathsForUser(userId, (response) => {
            //         console.log(`Response received = ${JSON.stringify(response)}`);
            //         return response;
            //     });
            // }
            resolve: function (_, { userId }) {
                return new Promise((resolve, reject) => {
                    console.log('Loading shopping paths for user');
                    getShoppingPathsForUser(userId, (err, response) => {
                        console.log(`Response received = ${JSON.stringify(response)}`);
                        if (err) {
                            reject(err);
                        }
                        resolve(response);
                    });
                })
            }
        }
    }
});

export default ShoppingPathQuery;
