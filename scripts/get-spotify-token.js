const querystring = require('querystring');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000'; // Make sure this matches your Spotify App settings

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables.');
  process.exit(1);
}

const SCOPES = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-modify-playback-state', // Required for play/pause control
  'streaming', // Required for Web Playback SDK
  'user-read-email',
  'user-read-private',
];

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const state = generateRandomString(16);
const authorizeURL = 'https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPES.join(' '),
    redirect_uri: REDIRECT_URI,
    state: state
  });

console.log('1. Go to this URL to authorize the app:');
console.log(authorizeURL);
console.log('\n2. After authorizing, you will be redirected to a URL like: http://localhost:3000/?code=...&state=...');
console.log('3. Copy the "code" parameter from the URL.');
console.log('4. Run the following command to get your refresh token:');
console.log(`   curl -H "Authorization: Basic $(echo -n "${CLIENT_ID}:${CLIENT_SECRET}" | base64)" -d grant_type=authorization_code -d code=YOUR_CODE_HERE -d redirect_uri=${REDIRECT_URI} https://accounts.spotify.com/api/token`);
console.log('\n5. Look for "refresh_token" in the response and update your .env file with:');
console.log('   SPOTIFY_REFRESH_TOKEN=your_new_refresh_token_here');
console.log('\n⚠️  IMPORTANT: Make sure to use the NEW refresh token that includes the "streaming" scope!');
console.log('   The old token will NOT work with the Web Playback SDK.');

