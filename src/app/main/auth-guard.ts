import { inject } from '@angular/core';
import { CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';

export const authGuard: CanMatchFn = () => {
  const router = inject(Router);
  const contactService = inject(ContactService);
  const isLoggedIn = contactService.getLoginInformation();
  if (isLoggedIn) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};
