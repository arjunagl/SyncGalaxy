'use strict';
import { SampleStores } from './sampleData';

module.exports.get = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*" // Required for CORS support to work
    },
    body: JSON.stringify({
      stores: SampleStores,
      input: event,
    }),
  };

  callback(null, response);
};
