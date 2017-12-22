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
            resolve: function (_, { userId }) {
                console.log('resolving...');
                getShoppingPathsForUser(userId, (response) => {
                    console.log(`Response received = ${JSON.stringify(response)}`);
                    return response;
                });
            }
        }
    }
});

export default ShoppingPathQuery;
