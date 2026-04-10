import { Component, output } from '@angular/core';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [Button],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.css',
})
export class ConfirmationDialog {
  decision = output<boolean>();

  onCancel() {
    this.decision.emit(false);
  }
  onConfirm() {
    this.decision.emit(true);
  }
}
