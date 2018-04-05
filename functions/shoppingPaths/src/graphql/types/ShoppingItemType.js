import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLID } from 'graphql'

const ShoppingPathItemType = new GraphQLObjectType({
    name: 'ShoppingPathItem',
    description: 'ShoppingPathItem Type, The items included in a Shopping Path',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'Id of the ShoppingItem',
        },
        name: {
            type: GraphQLString,
            description: 'Name of the shopping item'
        },
        pickedUp: {
            type: GraphQLBoolean,
            description: 'Indication if this item was picked up or not, true if the item was picked up'
        },
        location: {
            type: GraphQLString,
            description: 'Description of the location of the item'
        },
        locationHint: {
            type: GraphQLString,
            description: 'A small hint where applicable to find the item'
        },
        locationOrder: {
            type: GraphQLInt,
            description: 'Order in which the items should be sorted'
        }
    })
});

const ShoppingPathItemInputType = new GraphQLInputObjectType({
    name: 'ShoppingPathItemInput',
    description: 'ShoppingPathItem Type, The items included in a Shopping Path',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'Id of the ShoppingItem',
        },
        name: {
            type: GraphQLString,
            description: 'Name of the shopping item'
        },
        pickedUp: {
            type: GraphQLBoolean,
            description: 'Indication if this item was picked up or not, true if the item was picked up'
        },
        location: {
            type: GraphQLString,
            description: 'Description of the location of the item'
        },
        locationHint: {
            type: GraphQLString,
            description: 'A small hint where applicable to find the item'
        },
        locationOrder: {
            type: GraphQLInt,
            description: 'Order in which the items should be sorted'
        }
    })
});


export default ShoppingPathItemType;
export { ShoppingPathItemInputType };