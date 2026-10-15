const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../vercel.json'), 'utf8'));

test('country service is static and has no application or persistent state', () => {
  assert.equal(config.outputDirectory, 'public');
  assert.equal(config.framework, null);
  assert.equal(config.buildCommand, null);
  assert.equal(config.functions, undefined);
  assert.deepEqual(fs.readdirSync(path.join(__dirname, '../public')), ['analytics-country.json']);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(__dirname, '../public/analytics-country.json'), 'utf8')), {});
});
test('CORS exposes only the country header to the profile origin, without credentials', () => {
  const headers = Object.fromEntries(config.headers[0].headers.map(h => [h.key, h.value]));
  assert.equal(headers['Access-Control-Allow-Origin'], 'https://shiromatz.com');
  assert.equal(headers['Access-Control-Expose-Headers'], 'X-Analytics-Country');
  assert.equal(headers['Access-Control-Allow-Credentials'], undefined);
  assert.equal(headers['Cache-Control'], 'private, no-store');
  assert.equal(headers.Vary, 'X-Vercel-IP-Country');
});
test('edge-derived country is scoped to the endpoint and no location input is forwarded', () => {
  for (const rule of config.headers) assert.equal(rule.source, '/analytics-country.json');
  assert.deepEqual(config.headers[1].has, [{type:'header', key:'x-vercel-ip-country', value:'^(?<country>[A-Z]{2})$'}]);
  assert.deepEqual(config.headers[1].headers, [{key:'X-Analytics-Country', value:':country'}]);
  assert.ok(!JSON.stringify(config).match(/toefl|tablega|ip-address|latitude|longitude|city|set-cookie/i));
});
