import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactComponent } from './contact/contact';
import { Controls } from '../controls/controls';
import { ContactService } from '../../services/contact.service';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AngularDialog } from '../../shared/feedback/angular-dialog/angular-dialog';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-contact-list',
  imports: [ContactComponent, Controls, RouterLink, MatIcon, MatButtonModule, MatExpansionModule],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactList implements OnInit {
  private contactService = inject(ContactService);
  private dialog = inject(MatDialog);

  contacts = computed(() => {
    let filtered = this.contactService.contacts();

    if (this.filter() === 'favorite') {
      filtered = filtered.filter((c) => c.favorite === 1);
    }

    if (this.search().trim()) {
      filtered = [...filtered].filter(
        (c) =>
          c.name.toLowerCase().includes(this.search().toLowerCase()) ||
          c.lastName.toLowerCase().includes(this.search().toLowerCase()) ||
          c.address?.toLowerCase().includes(this.search().toLowerCase()) ||
          c.note?.toLowerCase().includes(this.search().toLowerCase()) ||
          c.telNumber.some((tel) => tel.toLowerCase().includes(this.search().toLowerCase())),
      );
    }

    if (this.sort() === 'asc') filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));

    if (this.sort() === 'desc') filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));

    return filtered;
  });

  groupedContacts = computed(() => {
    this.sort();
    return this.contacts().reduce((acc: { letter: string; items: Contact[] }[], curr: Contact) => {
      const letter = curr.name.charAt(0).toUpperCase();
      let group = acc.find((g) => g.letter.toUpperCase() === letter);
      if (!group) {
        group = { letter, items: [] };
        acc.push(group);
      }

      group.items.push(curr);
      return acc;
    }, []);
  });

  showContactForEditing = signal(false);

  clickedContact: Contact | null = null;

  filter = signal<'favorite' | 'all'>('all');
  search = signal<string>('');
  sort = signal<'asc' | 'desc'>('asc');

  ngOnInit() {
    this.contactService.searchQuery$.subscribe((data) => this.search.set(data));
  }

  onDeleteContact(contactId: string) {
    const contact = this.contactService.getContact(contactId);

    if (!contact) return;
    const dialogRef = this.dialog.open(AngularDialog, {
      data: { name: `${contact.name} ${contact.lastName}` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true && contactId) {
        this.contactService.deleteContact(contactId);
      }
    });
  }

  onFavouriteContact(contact: Contact) {
    contact.favorite = contact.favorite === 1 ? 0 : 1;
    this.contactService.updateContact(contact);
  }

  onFilterChange(filter: 'all' | 'favorite') {
    this.filter.set(filter);
  }

  onSearchContacts(query: string) {
    this.search.set(query);
  }

  onSortContacts(sortType: 'asc' | 'desc') {
    this.sort.set(sortType);
  }

  showGroupLetter(i: number) {
    if (i === 0) {
      return true;
    }
    const currentContact = this.contacts()[i];
    const prevContact = this.contacts()[i - 1];

    if (currentContact.name[0].toUpperCase() === prevContact.name[0].toUpperCase()) {
      return false;
    }
    return true;
  }
}
