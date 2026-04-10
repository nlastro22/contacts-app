import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class Notification implements OnInit {
  text = input.required<string>();
  isExiting = signal(false);

  ngOnInit() {
    setTimeout(() => {
      this.isExiting.set(true);
    }, 2500);
  }
}
