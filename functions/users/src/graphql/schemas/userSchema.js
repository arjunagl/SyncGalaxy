import { GraphQLSchema } from 'graphql';
import {UserQuery, UserMutation} from '../queries/userMutation';

const UserSchema = new GraphQLSchema({
    query: UserQuery,
    mutation: UserMutation
});

export default UserSchema;
