import { Component, CUSTOM_ELEMENTS_SCHEMA, input, output, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-controls',
  imports: [MatIcon, MatButtonModule, MatButtonToggleModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './controls.html',
  styleUrl: './controls.css',
})
export class Controls {
  filter = output<'all' | 'favorite'>();
  sort = output<'asc' | 'desc'>();

  contactNum = input.required();

  isVisible = signal(false);

  onToggleButton(event: MatButtonToggleChange) {
    if (event.value === 'all') this.filter.emit('all');
    else if (event.value === 'fav') this.filter.emit('favorite');
  }

  onFavoriteContacts() {
    this.filter.emit('favorite');
  }

  allContacts() {
    this.filter.emit('all');
  }

  onSortingContacts() {
    this.isVisible.set(!this.isVisible());
  }

  onSortAsc() {
    this.sort.emit('asc');
    this.isVisible.set(false);
  }

  onSortDesc() {
    this.sort.emit('desc');
    this.isVisible.set(false);
  }
}
