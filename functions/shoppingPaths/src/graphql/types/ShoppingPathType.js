import { GraphQLBoolean, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql'
import ShoppingItemType from './ShoppingItemType';

const ShoppingPathType = new GraphQLObjectType({
    name: 'ShoppingPath',
    description: 'ShoppingPath Type, For all the shopping paths the user has been involved in.',

    fields: () => ({
        Id: {
            type: GraphQLID,
            description: 'ID of the shopping path',
        },
        name: {
            type: GraphQLString,
            description: 'Name of the shopping path'
        },
        userId: {
            type: GraphQLID,
            description: 'Id of the user to whom this shopping path belongs to',
        },
        storeId: {
            type: GraphQLID,
            description: 'Id of the store to which this shopping path was applied, at the moment a shopping path has only one store'
        },
        completed: {
            type: GraphQLBoolean,
            description: 'Indication as to if this shopping path was completed or not, true if the path was completed'
        },
        dateCreated: {
            type: GraphQLString,
            description: 'Date on which this shopping path was created'
        },
        shoppingItems: {
            type: new GraphQLList(ShoppingItemType),
            description: 'Shopping items in this shopping path'
        }
    })
});

export default ShoppingPathType;
