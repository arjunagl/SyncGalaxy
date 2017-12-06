var AWSMock = require('aws-sdk-mock');
import { getShoppingLists } from './shoppingListsHandler';
import sinon from 'sinon';

describe('storesHandler', () => {
  it('storesHandler.getStores -> calls DynamoDB.DocumentClient.Scan with  filter parameters when store filter is given',
    () => {
      process.env.ShoppingListsTable = 'testTable';
      const scanTableSpy = sinon.spy();
      const callbackSpy = sinon.spy();
      AWSMock.mock('DynamoDB.DocumentClient', 'scan', scanTableSpy);
      getShoppingLists({ pathParameters: { user: 'albert' } }, callbackSpy);
      expect(scanTableSpy.args[0][0]).toEqual({
        TableName: 'testTable',
        FilterExpression: '#User = :filterUser',
        ExpressionAttributeNames: { '#User': 'User' },
        ExpressionAttributeValues: { ':filterUser': 'albert' }
      });
      AWSMock.restore('DynamoDB.DocumentClient');
    }
  );

  it('storesHandler.getStores -> returns an observable when called', (done) => {
    const sampleShoppingLists = [{
      Id: '1',
      Name: 'Groceries',
    }, {
      Id: '2',
      Name: 'Vegetables',
    }, {
      Id: '3',
      Name: 'Fruits',
    }];

    const callbackSpy = sinon.spy();

    process.env.ShoppingListsTable = 'testTable';
    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
      callback(null, {
        Items: sampleShoppingLists
      });
    });

    const expectedResponse = {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: '{"shoppingLists":[{"Id":"1","Name":"Groceries"},{"Id":"2","Name":"Vegetables"},{"Id":"3","Name":"Fruits"}],"input":{"pathParameters":{"user":"albert"}}}'
    };

    getShoppingLists({
      pathParameters: { user: 'albert' }
    }, null, (err, result) => {
      console.log(result);
      callbackSpy(null, result);
      expect(callbackSpy.withArgs(null, expectedResponse).calledOnce).toBeTruthy();
      AWSMock.restore('DynamoDB.DocumentClient');
      done();
    });
  });
});
