import { getStores } from './storesHandler';
import sinon from 'sinon';

describe('storesHandler', () => {
  it('storesHandler.getStores -> returns an observable when called', () => {
    console.log('calling');
    process.env.StoresTable = 'TestTable';
    process.env.AWS_DEFAULT_REGION = 'us-east-1'    
    const result = getStores();
  });
});
