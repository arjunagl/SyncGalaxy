'use strict';
import { SampleStores } from './sampleData';

module.exports.get = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      stores: SampleStores,
      input: event,
    }),
  };

  callback(null, response);
};
