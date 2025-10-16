import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class HeaderStore {
  public readonly isMobileMenuOpen = signal(false);
  open() { this.isMobileMenuOpen.set(true); }
  close() { this.isMobileMenuOpen.set(false); }
  toggle() { this.isMobileMenuOpen.update(v => !v); }
}
