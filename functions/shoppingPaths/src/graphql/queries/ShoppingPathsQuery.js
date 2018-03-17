import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import ShoppingPathType from '../types/ShoppingPathType';
import { getShoppingPathsForUser, getShoppingPath } from '../../services/shoppingPathService';

const ShoppingPathQuery = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        ShoppingPaths: {
            type: new GraphQLList(ShoppingPathType),
            args: {
                userId: { type: GraphQLString }
            },
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
        },
        ShoppingPathById: {
            type: ShoppingPathType,
            args: {
                Id: { type: GraphQLString }
            },
            resolve: function (_, { Id }) {
                return new Promise((resolve, reject) => {
                    console.log(`Loading shopping path for id = ${Id}`);
                    getShoppingPath(Id, (err, response) => {
                        console.log(`Response received = ${JSON.stringify(response)}`);
                        if (err) {
                            reject(err);
                            console.log('Error in obtaining shopping path by id');
                        }
                        resolve(response);
                    });
                })
            }
        }
    })
});

export default ShoppingPathQuery;
