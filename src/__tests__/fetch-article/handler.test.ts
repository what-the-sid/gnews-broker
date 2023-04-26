import { Handler } from '../../fetch-article'
import NodeCache from "node-cache"
import validData from '../fixtures/fetch-article/valid.json';
import invalidData from '../fixtures/fetch-article/invalid.json';
import successResponse from '../fixtures/fetch-article/success-response.json';

const fetchCache = new NodeCache( { stdTTL: 300, checkperiod: 360 } );

// Tests for scripts whether the erros are handled correctly
describe('API Error Handling:::', () => {
  it('ERROR:invalid payload', async () => {
    const handler = new Handler()

    const response = await handler.fetch(invalidData,fetchCache);

    expect(response).toStrictEqual({
        "error": true,
        "errorCode": 400,
        "details": "\"temp\" is not allowed",
        "category": "INVALID-INPUT"
      });
  });
});

// Tests for scripts whether the data is parsed correctly
describe('API Success Response:::',() => {
  it('SUCCESS: For query "google"', async () => {
    const handler = new Handler

    const response = await handler.fetch(validData,fetchCache);

    expect(Object.prototype.hasOwnProperty.call(response,'articles'))
    .toStrictEqual(Object.prototype.hasOwnProperty.call(successResponse,'articles'));
  });
})
