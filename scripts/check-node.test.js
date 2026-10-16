const { test } = require('node:test');
const assert = require('node:assert');
const { isSupported } = require('./check-node');

test('rejects Node versions below the supported ranges', () => {
  for (const v of ['18.20.4', '20.0.0', '20.18.1', '21.7.3', '22.0.0', '22.11.0']) {
    assert.strictEqual(isSupported(v), false, v);
  }
});

test('accepts Node versions within the supported ranges', () => {
  for (const v of ['20.19.0', '20.20.1', '22.12.0', '22.20.0', '23.0.0', '24.22.0']) {
    assert.strictEqual(isSupported(v), true, v);
  }
});
