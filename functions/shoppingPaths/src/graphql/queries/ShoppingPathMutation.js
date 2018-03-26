import { GraphQLObjectType, GraphQLString } from 'graphql';
import ShoppingPathType from '../types/ShoppingPathType';

const ShoppingPathsMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        UpdateShoppingPath: {
            type: ShoppingPathType,
            args: {
                shoppingPath: { type: GraphQLString }
            },
            resolve: function (_, { shoppingPath }) {
                console.log(`Updating shopping path: ${shoppingPath}`);
                return new Promise((resolve, reject) => {
                    if (!shoppingPath) {
                        return reject('Must supply a shopping path');
                    }
                    resolve(shoppingPath);
                });
            }
        }
    })
});

export default ShoppingPathsMutation;
