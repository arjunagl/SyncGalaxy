import { GraphQLObjectType } from 'graphql';
import { updateShoppingPath } from '../../services/shoppingPathService';
import ShoppingPathType, { ShoppingPathInputType } from '../types/ShoppingPathType';

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
                            return reject(err); 
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
