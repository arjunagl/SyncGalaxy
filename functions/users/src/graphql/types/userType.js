import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User Type.',

    fields: () => ({
        Id: {
            type: GraphQLID,
            description: 'ID of the user',
        },
        firstName: {
            type: GraphQLString,
            description: 'First name of the user'
        },
        lastName: {
            type: GraphQLString,
            description: 'Last name of the user',
        },
        email: {
            type: GraphQLString,
            description: 'Email of the user'
        }
    })
});

export { UserType };
