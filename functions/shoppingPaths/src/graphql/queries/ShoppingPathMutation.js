import { GraphQLObjectType, GraphQLString } from 'graphql';
import ShoppingPathType, { ShoppingPathInputType } from '../types/ShoppingPathType';
import { updateShoppingPath } from '../../services/shoppingPathService';

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

export default ShoppingPathsMutation;
