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
                    console.log(`Response received = ${JSON.stringify(response)}`);
                    return response;
                });
            }
        }
    }
});

export default ShoppingPathQuery;
