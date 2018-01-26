var AWSMock = require('aws-sdk-mock');
import sinon from 'sinon';
import { getShoppingPathsForUser } from './shoppingPathService';

describe('shoppingPathService', () => {
    it('shoppingPathService.getShoppingPathsForUser -> calls DynamoDB.DocumentClient.Scan for the specified user',
        () => {
            process.env.ShoppingPathsTable = 'testTable';
            const scanTableSpy = sinon.spy();
            const callbackSpy = sinon.spy();
            AWSMock.mock('DynamoDB.DocumentClient', 'scan', scanTableSpy);
            getShoppingPathsForUser('testUser', callbackSpy);
            expect(scanTableSpy.args[0][0]).toEqual({
                TableName: 'testTable',
                FilterExpression: 'contains(#UserId, :filterUserId)',
                ExpressionAttributeNames: { '#UserId': 'userId' },
                ExpressionAttributeValues: { ':filterUserId': 'testUser' }
            });
            AWSMock.restore('DynamoDB.DocumentClient');
        }
    );

    it('shoppingPathService.getShoppingPathsForUser -> returns the items when called', (done) => {
        const sampleShoppingPaths = []; //No need to put anything here, we just want to make sure that the items are just returned thats all.
        process.env.ShoppingPathsTable = 'testTable';

        AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
            callback(null, {
                Items: sampleShoppingPaths
            });
        });

        getShoppingPathsForUser('testUser', (err, shoppingPaths) => {
            expect(shoppingPaths).toEqual(sampleShoppingPaths);
            done();
        });
    });
});