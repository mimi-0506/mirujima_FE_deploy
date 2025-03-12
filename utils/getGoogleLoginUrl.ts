export default function getGoogleLoginUrl() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI || 'http://localhost:3000/auth/callback',
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'select_account'
  };

  const qs = new URLSearchParams(options).toString();
  return `${rootUrl}?${qs}`;
}
