import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal, OnInit } from '@angular/core';
import { Title } from '../../shared/components/title/title';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from '../../shared/components/button/button';
import { Notification } from '../../shared/feedback/notification/notification';
import { ErrorComponent } from '../../error/error';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '../../shared/feedback/snackbar/snackbar';
import { MatDialog } from '@angular/material/dialog';
import { AngularDialog } from '../../shared/feedback/angular-dialog/angular-dialog';

@Component({
  selector: 'app-contact-details',
  imports: [
    Title,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    Button,
    Notification,
    ErrorComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.css',
})
export class ContactDetails implements OnInit {
  private contactService = inject(ContactService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  contact: Contact | undefined = undefined;
  id: string | null = '';

  phoneNums: FormArray = new FormArray<FormControl<string>>([]);
  showActionButtons = signal<boolean>(false);

  showMessage = signal(false);

  form = new FormGroup({
    firstName: new FormControl('', { validators: Validators.required, nonNullable: true }),
    lastName: new FormControl('', { validators: Validators.required, nonNullable: true }),
    address: new FormControl(''),
    note: new FormControl(''),
    telephoneNums: this.phoneNums,
  });

  ngOnInit() {
    this.initializeFormData();
  }

  initializeFormData() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) {
      return;
    }
    this.contact = this.contactService.getContact(this.id);
    if (!this.contact) {
      return;
    }

    this.phoneNums.clear();

    this.contact.telNumber.forEach((num, i) => {
      if (i === 0)
        this.phoneNums.push(
          new FormControl(num, { validators: Validators.required, nonNullable: true }),
        );
      else this.phoneNums.push(new FormControl(num));
    });

    this.form.reset({
      firstName: this.contact.name,
      lastName: this.contact.lastName,
      address: this.contact.address,
      note: this.contact.note,
      telephoneNums: this.contact.telNumber,
    });

    this.showActionButtons.set(false);
    this.form.disable();
  }

  onEditBtn() {
    this.form.enable();
    this.showActionButtons.set(true);
  }

  onDeleteBtn() {
    const dialogRef = this.dialog.open(AngularDialog, {
      data: { name: `${this.contact?.name} ${this.contact?.lastName}` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true && this.contact) {
        this.contactService.deleteContact(this.contact.id);
        this.router.navigate(['/']);
      }
    });
  }

  onCancelBtn() {
    this.initializeFormData();
  }

  onSaveBtn() {
    if (this.form.invalid) {
      return;
    }

    const data = this.form.getRawValue();
    if (!this.contact) {
      return;
    }
    this.contact = {
      id: this.contact.id,
      name: data.firstName,
      lastName: data.lastName,
      address: data.address ?? undefined,
      note: data.note ?? undefined,
      telNumber: data.telephoneNums.filter((c) => c && c.trim('') !== ''),
      favorite: this.contact.favorite,
    };

    this.contactService.updateContact(this.contact);

    this.initializeFormData();

    this._snackBar.openFromComponent(Snackbar, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: { text: 'Podaci uspješno ažurirani' },
    });
  }
}
