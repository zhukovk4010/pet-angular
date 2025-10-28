import {Component, inject} from '@angular/core';
import {SvgIconComponent} from 'angular-svg-icon';
import {HeaderStore} from '../header.store';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header-mobile-menu',
  imports: [
    SvgIconComponent,
    RouterLink
  ],
  templateUrl: './header-mobile-menu.html',
  styleUrl: './header-mobile-menu.scss'
})
export class HeaderMobileMenu {
  protected readonly headerStore = inject(HeaderStore);
}
