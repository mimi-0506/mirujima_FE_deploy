export default function getGoogleLoginUrl() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    redirect_uri:
      process.env.NEXT_PUBLIC_REDIRECT_URI ||
      process.env.NEXT_LOCAL_REDIRECT_URI ||
      'https://mirujima-fe-deploy-mimi0506.vercel.app/auth/callback' ||
      'http://localhost:3000/auth/callback',
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'select_account'
  };

  const qs = new URLSearchParams(options).toString();
  return `${rootUrl}?${qs}`;
}
