import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ContactService } from '../../services/contact.service';
@Component({
  selector: 'app-search-bar',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  private contactService = inject(ContactService);

  onSearchChange(value: string) {
    this.contactService.updateSearchQuery(value);
  }
}
