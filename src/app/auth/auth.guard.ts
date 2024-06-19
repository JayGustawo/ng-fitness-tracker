import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (true || authService.isAuth()) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
