import { GraphQLSchema } from 'graphql';
import ShoppingPathQuery from '../queries/ShoppingPathsQuery'

const ShoppingPathSchema = new GraphQLSchema({
    query: ShoppingPathQuery,
});

export default ShoppingPathSchema;
