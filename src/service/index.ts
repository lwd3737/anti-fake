import AuthService from './auth';

const globalForServices = global as unknown as {
  authService: AuthService;
};

export const authService = globalForServices.authService ?? new AuthService();
