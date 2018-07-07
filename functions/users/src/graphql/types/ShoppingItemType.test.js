import { GraphQLBoolean, GraphQLString, GraphQLID } from 'graphql'
import ShoppingPathItemType from './ShoppingItemType';

describe('ShoppingPathItemType', () => {
    it('Should have the proper fields', () => {        
        const shoppingPathItemTypeFields = ShoppingPathItemType.getFields();
        expect(shoppingPathItemTypeFields).toHaveProperty('id');
        expect(shoppingPathItemTypeFields).toHaveProperty('id.type', GraphQLID);

        expect(shoppingPathItemTypeFields).toHaveProperty('name');
        expect(shoppingPathItemTypeFields).toHaveProperty('name.type', GraphQLString);

        expect(shoppingPathItemTypeFields).toHaveProperty('pickedUp');
        expect(shoppingPathItemTypeFields).toHaveProperty('pickedUp.type', GraphQLBoolean);
    });
});