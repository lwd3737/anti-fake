import AuthService from './auth';

const globalForServices = global as unknown as {
  authService: AuthService;
};

if (!globalForServices.authService)
  globalForServices.authService = new AuthService();

export const authService = globalForServices.authService;
