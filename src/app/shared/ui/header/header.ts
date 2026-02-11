import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SvgIconComponent} from 'angular-svg-icon';
import {HeaderDesktopNav} from './header-desktop-nav/header-desktop-nav';
import {HeaderStore} from './data/header.store';
import {HeaderMobileMenu} from './header-mobile-menu/header-mobile-menu';
import {Overlay, OverlayHandle} from '../../../core/overlay/overlay';
import {take} from 'rxjs';

@Component({
  selector: 'sb-header',
  imports: [
    RouterLink,
    SvgIconComponent,
    HeaderDesktopNav
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  protected readonly headerStore = inject(HeaderStore);
  private readonly _overlayService = inject(Overlay);
  private mobileMenuOverlay: OverlayHandle<HeaderMobileMenu> | null = null;

  protected onOpen(): void {
    if (this.mobileMenuOverlay) {
      return;
    }

    this.mobileMenuOverlay = this._overlayService.open(HeaderMobileMenu, {
      variant: 'fullscreen',
    });

    this.mobileMenuOverlay.afterClosed$.pipe(take(1)).subscribe(() => {
      this.mobileMenuOverlay = null;
      this.headerStore.closeMobileMenu();
    });
  }
}
