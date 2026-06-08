const crypto = require('crypto');
const fs = require('fs');

const CONSUMER_KEY = '3MVG9ux34Ig8G5epa7grwfn2iSTE9re6r9PgS4NeWZ0nvVJGzC2bfshfXBGk1ZeGp.Y0oIqhlHo0zRhmJt8ds';
const USERNAME = 'apisalesforce@asupernova.com.br';
const AUDIENCE = 'https://login.salesforce.com';
const INSTANCE_URL = 'https://asupernova.my.salesforce.com';
const PRIVATE_KEY_PATH = 'C:\\Users\\hiago.sousa\\Downloads\\Interno_Produtos\\Interno_Produtos\\server.key';

function base64url(b) {
  return b.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

(async () => {
  const exp = Math.floor(Date.now() / 1000) + 300;
  const header = base64url(Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })));
  const payload = base64url(Buffer.from(JSON.stringify({ iss: CONSUMER_KEY, sub: USERNAME, aud: AUDIENCE, exp })));
  const input = header + '.' + payload;
  const pk = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');
  const sig = crypto.createSign('RSA-SHA256');
  sig.update(input);
  sig.end();
  const jwt = input + '.' + base64url(sig.sign(pk));

  const p = new URLSearchParams();
  p.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
  p.append('assertion', jwt);

  const auth = await fetch(INSTANCE_URL + '/services/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: p.toString(),
  });
  const token = await auth.json();
  if (!auth.ok) throw new Error(JSON.stringify(token));
  console.log('autenticado.');

  const soql = "SELECT RecordType.Name, COUNT(Id) total FROM Opportunity WHERE StageName = 'Fechado e ganho' GROUP BY RecordType.Name ORDER BY COUNT(Id) DESC LIMIT 20";
  const r = await fetch(INSTANCE_URL + '/services/data/v59.0/query?q=' + encodeURIComponent(soql), {
    headers: { Authorization: 'Bearer ' + token.access_token },
  });
  const data = await r.json();
  console.log(JSON.stringify(data, null, 2));
})().catch(e => console.error(e.message));
