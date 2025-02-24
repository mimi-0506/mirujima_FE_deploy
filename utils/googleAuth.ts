export class GoogleAuthService {
  private static readonly AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

  static getLoginUrl(options: any): string {
    if (!options.clientId) {
      throw new Error('Google Client ID is required');
    }

    const params = {
      client_id: options.clientId,
      redirect_uri: options.redirectUri,
      response_type: 'code',
      scope: options.scope.join(' '),
      access_type: options.accessType || 'offline',
      prompt: options.prompt || 'select_account'
    };

    const queryString = new URLSearchParams(params).toString();
    return `${this.AUTH_URL}?${queryString}`;
  }
}
