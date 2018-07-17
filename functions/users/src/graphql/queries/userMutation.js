import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { UserType, UserTypeInput } from '../types/userType';

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
                return {
                    Id: '1',
                    firstName: 'a',
                    lastName: 'b',
                    email: 'a@b'
                };
            }
        }
    })
});


const UserMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        registerUser: {
            type: UserType,
            args: {
                userDetails: { type: UserTypeInput }
            },
            resolve: function (_, user) {
                return new Promise((_resolve, _reject) => {
                    console.log('Registering new user from the Mutation', user);
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
