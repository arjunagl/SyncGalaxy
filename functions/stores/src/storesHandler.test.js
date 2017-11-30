var AWSMock = require('aws-sdk-mock');
// const AWS = require("aws-sdk");
import { getStores } from './storesHandler';
import { SampleStores } from './sampleData';
import sinon from 'sinon';

describe('storesHandler', () => {
  it('storesHandler.getStores -> calls DynamoDB.DocumentClient.Scan without any filter parameters when no store filter is given',
    () => {
      process.env.StoresTable = 'testTable';
      const scanTableSpy = sinon.spy();
      const callbackSpy = sinon.spy();
      AWSMock.mock('DynamoDB.DocumentClient', 'scan', scanTableSpy);
      getStores({ pathParameters: null }, callbackSpy);
      expect(scanTableSpy.args[0][0]).toEqual({ TableName: 'testTable' });
      AWSMock.restore('DynamoDB.DocumentClient');
    }
  );

  it('storesHandler.getStores -> calls DynamoDB.DocumentClient.Scan with  filter parameters when store filter is given',
    () => {
      process.env.StoresTable = 'testTable';
      const scanTableSpy = sinon.spy();
      const callbackSpy = sinon.spy();
      AWSMock.mock('DynamoDB.DocumentClient', 'scan', scanTableSpy);
      getStores({ pathParameters: { storeName: 'testStore' } }, callbackSpy);
      expect(scanTableSpy.args[0][0]).toEqual({
        TableName: 'testTable',
        FilterExpression: 'contains(#StoreName, :filterStoreName)',
        ExpressionAttributeNames: { '#StoreName': 'Name' },
        ExpressionAttributeValues: { ':filterStoreName': 'testStore' }
      });
      AWSMock.restore('DynamoDB.DocumentClient');
    }
  );

  it('storesHandler.getStores -> calls S3.getObject for each store that is returned', () => {
    process.env.StoresTable = 'testTable';
    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
      callback(null, {
        Items: SampleStores
      });
    });

    const getObjectSpy = sinon.spy();
    const callbackSpy = sinon.spy();
    AWSMock.mock('S3', 'getObject', getObjectSpy);
    getStores({ pathParameters: null }, callbackSpy);
    const getObjectSpyArgs = getObjectSpy.args;
    const expectedCallArgs = [
      { Bucket: 'testBucket', Key: 'coles.svg' },
      { Bucket: 'testBucket', Key: 'woolworths.svg' },
      { Bucket: 'testBucket', Key: 'aldi.svg' }
    ];

    getObjectSpyArgs.forEach(arg => {
      let val = expectedCallArgs.find(expectedArg => {
        return (expectedArg.Bucket === arg[0].Bucket && expectedArg.Key === arg[0].Key);
      });
      expect(val).toBeDefined();
    });

    AWSMock.restore('DynamoDB.DocumentClient');
    AWSMock.restore('S3');
  });

  it('storesHandler.getStores -> returns an observable when called without any filter specified', (done) => {

    // Mock the documentclient
    process.env.StoresTable = 'testTable';
    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
      callback(null, {
        Items: SampleStores
      });
    });

    // Mock the s3 scan
    process.env.S3_BUCKET = 'testBucket';
    var callbackSpy = sinon.spy();

    AWSMock.mock('S3', 'getObject', new Buffer('Dummy Data'));
    const expectedResponse = {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: '{"stores":[{"Id":"1","Name":"Coles","Location":"Mount Waverley","Hours":"9am - 9pm"},{"Id":"2","Name":"Woolworths","Location":"Mount Waverley","Hours":"9am - 9pm"},{"Id":"3","Name":"ALDI","Location":"Mount Waverley","Hours":"9am - 9pm"},{"Id":"4","Name":"Coles","Location":"Glen Waverley","Hours":"9am - 9pm"},{"Id":"5","Name":"Woolworths","Location":"Glen Waverley","Hours":"9am - 9pm"},{"Id":"6","Name":"ALDI","Location":"Glen Waverley","Hours":"9am - 9pm"},{"Id":"7","Name":"Coles","Location":"Chadstone","Hours":"9am - 9pm"},{"Id":"8","Name":"Woolworths","Location":"Chadstone","Hours":"9am - 9pm"},{"Id":"9","Name":"ALDI","Location":"Chadstone","Hours":"9am - 9pm"},{"Id":"10","Name":"Coles","Location":"Flinders","Hours":"9am - 9pm"},{"Id":"11","Name":"Woolworths","Location":"Flinders","Hours":"9am - 9pm"},{"Id":"12","Name":"ALDI","Location":"Flinders","Hours":"9am - 9pm"},{"Id":"13","Name":"Coles","Location":"East Malvern","Hours":"9am - 9pm"},{"Id":"14","Name":"Woolworths","Location":"East Malvern","Hours":"9am - 9pm"},{"Id":"15","Name":"ALDI","Location":"East Malvern","Hours":"9am - 9pm"},{"Id":"16","Name":"Coles","Location":"The Glen","Hours":"9am - 9pm"},{"Id":"17","Name":"Woolworths","Location":"The Glen","Hours":"9am - 9pm"},{"Id":"18","Name":"ALDI","Location":"The Glen","Hours":"9am - 9pm"}],"input":{"pathParameters":null}}'
    };

    getStores({
      pathParameters: null
    }, null, (err, result) => {
      callbackSpy(null, result);
      expect(callbackSpy.withArgs(null, expectedResponse).calledOnce).toBeTruthy();
      AWSMock.restore('DynamoDB.DocumentClient');
      AWSMock.restore('S3');
      done();
    });
  });


});
