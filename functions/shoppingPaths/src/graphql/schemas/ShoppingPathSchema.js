import { GraphQLSchema } from 'graphql';
import ShoppingPathQuery from '../queries/ShoppingPathsQuery'
import ShoppingPathMutation from '../queries/ShoppingPathMutation';

const ShoppingPathSchema = new GraphQLSchema({
    query: ShoppingPathQuery,
    mutation: ShoppingPathMutation
});

export default ShoppingPathSchema;
