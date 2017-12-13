import { GraphQLObjectType, GraphQLString } from 'graphql';
import ShoppingPathType from '../types/ShoppingPathType';
import { getShoppingPathsForUser } from '../../services/shoppingPathService';

const ShoppingPathQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        ShoppingPath: {
            type: ShoppingPathType,
            // `args` describes the arguments that the `user` query accepts
            args: {
                userId: { type: GraphQLString }
            },
            resolve: function (_, { userId }) {
                getShoppingPathsForUser(userId, (response) => {
                    console.log(`Response received = ${response}`);
                    return response;
                });
                // return {
                //     id: '1',
                //     name: 'shoppingPath1',
                //     userId: 'user1',
                //     storeId: 'store1',
                //     completed: true,
                //     dateCreated: '1/12/2017',
                //     shoppingItems: [
                //         {
                //             id: 'ap1',
                //             name: 'apples',
                //             pickedUp: true
                //         }
                //     ]
                // };
            }
        }
    }
});

export default ShoppingPathQuery;
