import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { UserType } from '../types/userType';

const UserQuery = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        User: {
            type: UserType,
            resolve: (_) => {
                // return new Promise((resolve, reject) => {
                //     console.log('Registering new user from the Mutation');
                //     // return new Promise((resolve, reject) => {
                //     //     console.log('Loading shopping paths for user');
                //     //     getShoppingPathsForUser(userId, (err, response) => {
                //     //         console.log(`Response received = ${JSON.stringify(response)}`);
                //     //         if (err) {
                //     //             reject(err);
                //     //         }
                //     //         resolve(response);
                //     //     });
                //     // })

                // });
                console.log('Resolving the user and returning a simple string');
                return new UserType();
            }
        }
    })
});


const UserMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        RegisterUser: {
            type: UserType,
            args: {
                userDetails: { type: UserType }
            },
            resolve: function (_, user) {
                return new Promise((resolve, reject) => {
                    console.log('Registering new user from the Mutation');
                    // return new Promise((resolve, reject) => {
                    //     console.log('Loading shopping paths for user');
                    //     getShoppingPathsForUser(userId, (err, response) => {
                    //         console.log(`Response received = ${JSON.stringify(response)}`);
                    //         if (err) {
                    //             reject(err);
                    //         }
                    //         resolve(response);
                    //     });
                    // })

                });
            }
        }
    })
});

export { UserQuery, UserMutation };
