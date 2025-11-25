import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class HeaderStore {
  public readonly isMobileMenuOpen = signal(false);
  public readonly isMobileMenuAccordionOpen = signal(false);

  public openMobileMenu(): void { this.isMobileMenuOpen.set(true); }
  public closeMobileMenu(): void { this.isMobileMenuOpen.set(false); }
  public toggleMobileMenuAccordion(): void { this.isMobileMenuAccordionOpen.update(isOpen => !isOpen); }
}
