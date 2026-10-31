const test = require('node:test')
const assert = require('node:assert')
const Exchange = require('../models/exchangeModel')

test('an exchange sent to the app never carries its credentials', () => {
    const json = new Exchange({
        exchange: 'binance',
        user: 'u1',
        api_key: 'enc:v1:aaa:bbb:ccc',
        api_key_hash: 'f00d',
        api_key_hint: 'AbCdEfGhI',
        secret_key: 'enc:v1:ddd:eee:fff',
    }).toJSON()

    assert.strictEqual(json.api_key, 'AbCdEfGhI')
    assert.strictEqual(json.secret_key, undefined)
    assert.strictEqual(json.api_key_hash, undefined)
    assert.strictEqual(json.api_key_hint, undefined)
})

test('an exchange saved before encryption still shows its key to the app', () => {
    const json = new Exchange({ exchange: 'binance', user: 'u1', api_key: 'PLAINKEY123', secret_key: 'plain' }).toJSON()

    assert.strictEqual(json.api_key, 'PLAINKEY123')
    assert.strictEqual(json.secret_key, undefined)
})
