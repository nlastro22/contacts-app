import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, MatIcon],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  title = input.required<string>();
  btnType = input.required<'cancel' | 'confirm'>();
  customColor = input<string>();
  icon = input<string>();
}
