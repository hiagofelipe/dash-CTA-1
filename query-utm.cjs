const crypto = require('crypto');
const fs = require('fs');

const CONSUMER_KEY = '3MVG9ux34Ig8G5epa7grwfn2iSTE9re6r9PgS4NeWZ0nvVJGzC2bfshfXBGk1ZeGp.Y0oIqhlHo0zRhmJt8ds';
const USERNAME = 'apisalesforce@asupernova.com.br';
const AUDIENCE = 'https://login.salesforce.com';
const INSTANCE_URL = 'https://asupernova.my.salesforce.com';
const PRIVATE_KEY_PATH = 'C:\\Users\\hiago.sousa\\Downloads\\Interno_Produtos\\Interno_Produtos\\server.key';

function base64url(buffer) {
  return buffer.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function run() {
  const exp = Math.floor(Date.now() / 1000) + 300;
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = { iss: CONSUMER_KEY, sub: USERNAME, aud: AUDIENCE, exp };
  const encodedHeader = base64url(Buffer.from(JSON.stringify(header)));
  const encodedPayload = base64url(Buffer.from(JSON.stringify(payload)));
  const tokenInput = `${encodedHeader}.${encodedPayload}`;
  const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(tokenInput);
  signer.end();
  const jwt = `${tokenInput}.${base64url(signer.sign(privateKey))}`;

  const params = new URLSearchParams();
  params.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
  params.append('assertion', jwt);
  const authRes = await fetch(`${INSTANCE_URL}/services/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });
  const authData = await authRes.json();
  if (!authRes.ok) throw new Error(JSON.stringify(authData));

  const soql = `SELECT UTM_Source__c, UTM_Campaign__c, COUNT(Id) total FROM Opportunity WHERE Produto__c = 'AUVP Consultoria' AND StageName = 'Fechado e ganho' AND UTM_Source__c != null GROUP BY UTM_Source__c, UTM_Campaign__c ORDER BY total DESC LIMIT 20`;
  const res = await fetch(`${INSTANCE_URL}/services/data/v59.0/query?q=${encodeURIComponent(soql)}`, {
    headers: { Authorization: `Bearer ${authData.access_token}` }
  });
  const result = await res.json();
  console.log(JSON.stringify(result, null, 2));
}

run().catch(console.error);
