import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';

import { Title } from '../../shared/components/title/title';

import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from '../../shared/components/button/button';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '../../shared/feedback/snackbar/snackbar';
import { hrPhoneValid } from '../../shared/validators/hr-phone.validators';

@Component({
  selector: 'app-new-contact',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    Title,
    Button,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './new-contact.html',
  styleUrl: './new-contact.css',
})
export class NewContact {
  private contactService = inject(ContactService);
  private _snackBar = inject(MatSnackBar);

  newNum = signal(false);

  form = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
      nonNullable: true,
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
      nonNullable: true,
    }),
    address: new FormControl('', { validators: [Validators.maxLength(100)] }),
    note: new FormControl('', { validators: [Validators.maxLength(200)] }),
    telNumber: new FormArray([
      new FormControl('', {
        validators: [Validators.required, hrPhoneValid],
        nonNullable: true,
      }),
    ]),
  });

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.getRawValue();
    this.contactService.addContact({
      firstName: data.firstName,
      lastName: data.lastName,
      telNumber: data.telNumber.filter((num) => num && num.trim() !== ''),
      address: data.address ?? undefined,
      note: data.note ?? undefined,
    });
    this.form.reset();

    this._snackBar.openFromComponent(Snackbar, {
      duration: 3000,
      data: { text: 'Uspješno ste dodali kontakt' },
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });

    this.phoneNumbers.clear();

    this.phoneNumbers.push(
      new FormControl('', {
        validators: [Validators.required, hrPhoneValid],
        nonNullable: true,
      }),
    );
  }

  get phoneNumbers() {
    return this.form.get('telNumber') as FormArray;
  }

  onAddPhoneNumber() {
    this.newNum.set(false);
    const numbersArray = this.phoneNumbers;

    if (numbersArray.length < 5) {
      numbersArray.push(
        new FormControl('', {
          validators: [hrPhoneValid],
        }),
      );
    }
  }

  onTypingNumber(i: number) {
    const notLastElement = i !== this.phoneNumbers.length - 1;
    if (this.phoneNumbers.length === 5 || notLastElement) {
      this.newNum.set(false);
      return;
    }

    this.newNum.set(true);
  }
}
