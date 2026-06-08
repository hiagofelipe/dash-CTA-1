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

async function getSalesforceToken() {
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
  const encodedSignature = base64url(signer.sign(privateKey));
  const jwt = `${tokenInput}.${encodedSignature}`;

  const params = new URLSearchParams();
  params.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
  params.append('assertion', jwt);

  const response = await fetch(`${INSTANCE_URL}/services/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  const data = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(data));

  console.log('autenticado. access_token obtido.');

  const query = encodeURIComponent('SELECT Id, Name, StageName, CreatedDate, LeadSource FROM Opportunity LIMIT 5');
  const res = await fetch(`${INSTANCE_URL}/services/data/v59.0/query?q=${query}`, {
    headers: { Authorization: `Bearer ${data.access_token}` }
  });

  const result = await res.json();
  console.log(JSON.stringify(result, null, 2));
}

getSalesforceToken().catch(console.error);
