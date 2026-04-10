import { Component, CUSTOM_ELEMENTS_SCHEMA, input, output } from '@angular/core';
import { Contact } from '../../../models/contact.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PhonePipe } from '../../../shared/pipes/phone-pipe';

@Component({
  selector: 'app-contact',
  imports: [MatCardModule, MatButtonModule, PhonePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  contact = input.required<Contact>();
  delete = output<string>();
  favourite = output<Contact>();

  onDeleteClick(e: Event) {
    e.stopPropagation();
    this.delete.emit(this.contact().id);
  }

  onFavouriteClick(e: Event) {
    e.stopPropagation();
    this.favourite.emit(this.contact());
  }
}
