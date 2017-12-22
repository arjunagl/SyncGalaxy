import { GraphQLString } from 'graphql';
import sinon from 'sinon';
import ShoppingPathQuery from './ShoppingPathsQuery';
import ShoppingPathType from '../types/ShoppingPathType';
import * as shoppingPathObject from '../../services/shoppingPathService';
const rewire = require('rewire');

describe('ShoppingPathQuery', () => {
    it('Should have the proper fields', () => {
        const shoppingPathQueryFields = ShoppingPathQuery.getFields();
        expect(shoppingPathQueryFields).toHaveProperty('ShoppingPath');
        expect(shoppingPathQueryFields).toHaveProperty('ShoppingPath.type', ShoppingPathType);
        expect(shoppingPathQueryFields).toHaveProperty('ShoppingPath.args');
        const shoppingPathQueryFieldArgs = shoppingPathQueryFields.ShoppingPath.args;
        expect(shoppingPathQueryFieldArgs[0]).toHaveProperty('name', 'userId');
        expect(shoppingPathQueryFieldArgs[0]).toHaveProperty('type', GraphQLString);
    });

    it('Should call getShoppingPathsForUser with the proper parameters when resolve is called', () => {
        const getShoppingPathsForUserStub = sinon.stub(shoppingPathObject, 'getShoppingPathsForUser').callsFake((userId, callback) => {
            callback('abcd');
        });
        const queryFields = ShoppingPathQuery.getFields();
        const results = queryFields.ShoppingPath.resolve(null, { userId: '1234' });
        console.log(`results ${results}`);
        expect(getShoppingPathsForUserStub.calledWithExactly('1234', sinon.match.func)).toEqual(true);
    });
});
