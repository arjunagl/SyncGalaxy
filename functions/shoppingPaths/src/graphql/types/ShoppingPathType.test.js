import { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLID, GraphQLList } from 'graphql'
import ShoppingItemType from './ShoppingItemType';
import ShoppingPathType from './ShoppingPathType';


describe('ShoppingPathType', () => {
    it('Should have the proper fields', () => {        
        const shoppingPathItemTypeFields = ShoppingPathType.getFields();
        expect(shoppingPathItemTypeFields).toHaveProperty('id');
        expect(shoppingPathItemTypeFields).toHaveProperty('id.type', GraphQLID);

        expect(shoppingPathItemTypeFields).toHaveProperty('name');
        expect(shoppingPathItemTypeFields).toHaveProperty('name.type', GraphQLString);

        expect(shoppingPathItemTypeFields).toHaveProperty('userId');
        expect(shoppingPathItemTypeFields).toHaveProperty('userId.type', GraphQLID);

        expect(shoppingPathItemTypeFields).toHaveProperty('storeId');
        expect(shoppingPathItemTypeFields).toHaveProperty('storeId.type', GraphQLID);

        expect(shoppingPathItemTypeFields).toHaveProperty('completed');
        expect(shoppingPathItemTypeFields).toHaveProperty('completed.type', GraphQLBoolean);

        expect(shoppingPathItemTypeFields).toHaveProperty('dateCreated');
        expect(shoppingPathItemTypeFields).toHaveProperty('dateCreated.type', GraphQLString);

        expect(shoppingPathItemTypeFields).toHaveProperty('shoppingItems');        
        expect(shoppingPathItemTypeFields).toHaveProperty('shoppingItems.type', new GraphQLList(ShoppingItemType));

    });
});