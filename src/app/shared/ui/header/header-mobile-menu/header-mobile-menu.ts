import {Component, inject} from '@angular/core';
import {SvgIconComponent} from 'angular-svg-icon';
import {HeaderStore} from '../data/header.store';
import {RouterLink} from '@angular/router';
import {OVERLAY_REF} from '../../../../core/overlay/overlay';
import {OverlayRef} from '../../../../core/overlay/overlay-ref';

@Component({
  selector: 'sb-header-mobile-menu',
  imports: [
    SvgIconComponent,
    RouterLink
  ],
  templateUrl: './header-mobile-menu.html',
  styleUrl: './header-mobile-menu.scss'
})
export class HeaderMobileMenu {
  protected readonly headerStore = inject(HeaderStore);
  private readonly overlayRef = inject(OVERLAY_REF, { optional: true }) as OverlayRef<void> | null;

  protected onClose(): void {
    this.headerStore.closeMobileMenu();
    this.overlayRef?.close();
  }
}
