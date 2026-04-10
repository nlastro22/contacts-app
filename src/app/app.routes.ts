import { Routes } from '@angular/router';
import { ContactList } from './main/contact-list/contact-list';
import { NewContact } from './main/new-contact/new-contact';
import { ContactDetails } from './main/contact-details/contact-details';
import { ErrorComponent } from './error/error';
import { authGuard } from './main/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  {
    path: 'contacts',
    canMatch: [authGuard],
    children: [
      { path: '', component: ContactList },
      {
        path: 'edit/:id',
        component: ContactDetails,
      },
      { path: 'new-contact', component: NewContact },
    ],
  },

  {
    path: 'unauthorized',
    component: ErrorComponent,
    data: { statusCode: '401', title: 'Morate se prijaviti da biste imali pristup' },
  },
  { path: '**', component: ErrorComponent },
];
