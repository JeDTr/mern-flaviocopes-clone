const tokenKey = "token";

class AuthService {
  credentials = {
    token: null,
  };

  constructor() {
    const savedToken =
      sessionStorage.getItem(tokenKey) || localStorage.getItem(tokenKey);

    if (savedToken) {
      this.credentials = savedToken;
    }
  }

  isAuthenticated() {
    return !!this.credentials.token;
  }

  setCredentials(credentials) {
    this.credentials = { ...this.credentials, ...credentials };
  }
}

export default new AuthService();
