import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './error.html',
  styleUrl: './error.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ErrorComponent {
  statusCode = input<string>('404');
  title = input<string>('Stranica nije pronađena');
}
