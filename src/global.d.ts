import AuthService from './services/auth';

declare global {
  var __authService__: AuthService;
}
