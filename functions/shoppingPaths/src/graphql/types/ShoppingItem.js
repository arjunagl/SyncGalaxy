import { GraphQLBoolean, GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

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
        }
    })
});

export default ShoppingPathItemType;