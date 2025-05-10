import AuthService from './service/auth';

declare global {
  var __authService__: AuthService;
}
