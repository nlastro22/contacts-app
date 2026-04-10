import { effect, Injectable, signal } from '@angular/core';
import { Contact } from '../models/contact.model';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly STORAGE_KEY = 'contacts';
  private readonly LOGIN_KEY = 'login';
  private searchSource = new BehaviorSubject<string>('');
  contacts = signal<Contact[]>(this.getContacts());

  searchQuery$ = this.searchSource.asObservable().pipe(
    debounceTime(500),
    distinctUntilChanged(),
    filter((query) => query.length >= 3 || query.length === 0),
  );

  updateSearchQuery(query: string) {
    this.searchSource.next(query);
  }

  constructor() {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.contacts()));
    });
  }

  getContacts(): Contact[] {
    const contacts = localStorage.getItem(this.STORAGE_KEY);
    if (!contacts) {
      return [];
    }
    return JSON.parse(contacts);
  }

  getContact(id: string): Contact | undefined {
    return this.contacts().find((contact) => contact.id === id);
  }

  addContact(contactData: {
    firstName: string;
    lastName: string;
    address?: string;
    note?: string;
    telNumber: string[];
  }) {
    const newContact: Contact = {
      id: Math.random().toString(),
      name: contactData.firstName,
      lastName: contactData.lastName,
      address: contactData.address,
      note: contactData.note,
      favorite: 0,
      telNumber: contactData.telNumber,
    };
    this.contacts.update((oldData) => [...oldData, newContact]);
  }

  deleteContact(id: string) {
    this.contacts.update((oldData) => {
      return oldData.filter((contact) => contact.id !== id);
    });
  }

  updateContact(contact: Contact) {
    this.contacts.update((oldData) => {
      return oldData.map((c) => (c.id === contact.id ? contact : c));
    });
  }

  toggleLogin(login: boolean) {
    if (login) {
      localStorage.setItem(this.LOGIN_KEY, 'true');
    } else {
      localStorage.setItem(this.LOGIN_KEY, 'false');
    }
  }

  getLoginInformation() {
    const login = localStorage.getItem(this.LOGIN_KEY);
    if (login) {
      return JSON.parse(login);
    }
    return null;
  }
}
