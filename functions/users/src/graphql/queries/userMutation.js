import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import ShoppingPathType from '../types/ShoppingPathType';

const ShoppingPathsMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        UpdateShoppingPath: {
            type: ShoppingPathType,
            args: {
                shoppingPath: { type: ShoppingPathInputType }
            },
            resolve: function (_, { shoppingPath }) {
                return new Promise((resolve, reject) => {
                    if (!shoppingPath) {
                        return reject('Must supply a shopping path');
                    }
                    updateShoppingPath(shoppingPath, (err, updatedShoppingPath) => {
                        if (err) {
                            console.log('Error in updating shopping path');
                            return reject(err); JSON.stringify
                        }
                        if (updatedShoppingPath) {
                            updatedShoppingPath.shoppingItems = JSON.parse(updatedShoppingPath.shoppingItems);
                        }
                        return resolve(updatedShoppingPath);
                    });
                });
            }
        }
    })
});


const UserMutation = new GraphQLObjectType({
    name: 'Mutation',
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
                            console.log('Error in obtaining shopping path by id');
                            return reject(err);
                        }
                        resolve(response);
                    });
                })
            }
        }
    })
});

export default ShoppingPathQuery;
