import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import UserType from '../types/userType';

// const ShoppingPathsMutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: () => ({
//         UpdateShoppingPath: {
//             type: ShoppingPathType,
//             args: {
//                 shoppingPath: { type: ShoppingPathInputType }
//             },
//             resolve: function (_, { shoppingPath }) {
//                 return new Promise((resolve, reject) => {
//                     if (!shoppingPath) {
//                         return reject('Must supply a shopping path');
//                     }
//                     updateShoppingPath(shoppingPath, (err, updatedShoppingPath) => {
//                         if (err) {
//                             console.log('Error in updating shopping path');
//                             return reject(err); JSON.stringify
//                         }
//                         if (updatedShoppingPath) {
//                             updatedShoppingPath.shoppingItems = JSON.parse(updatedShoppingPath.shoppingItems);
//                         }
//                         return resolve(updatedShoppingPath);
//                     });
//                 });
//             }
//         }
//     })
// });

const UserQuery = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        User: {
            type: UserType,
            resolve: function (_) {
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
                    email: 'a@b.com'
                }
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
