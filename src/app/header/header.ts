import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { SearchBar } from '../main/search-bar/search-bar';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoadingSpinner } from '../shared/feedback/loading-spinner/loading-spinner';

@Component({
  selector: 'app-header',
  imports: [SearchBar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly overlay = inject(Overlay);
  private readonly contactService = inject(ContactService);
  private readonly router = inject(Router);

  private overlayRef?: OverlayRef;

  isLoggedIn = signal(this.contactService.getLoginInformation());

  onLoginBtn() {
    this.showLoading();

    setTimeout(() => {
      this.isLoggedIn.set(!this.isLoggedIn());
      console.log(this.isLoggedIn());
      this.contactService.toggleLogin(this.isLoggedIn());
      this.router.navigate(['/']);
      this.hideLoading();
    }, 2000);
  }

  private showLoading() {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    });
    this.overlayRef.attach(new ComponentPortal(LoadingSpinner));
  }
  private hideLoading() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
