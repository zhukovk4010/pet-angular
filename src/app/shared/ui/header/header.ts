import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SvgIconComponent} from 'angular-svg-icon';
import {HeaderDesktopNav} from './header-desktop-nav/header-desktop-nav';
import {HeaderStore} from './data/header.store';
import {HeaderMobileMenu} from './header-mobile-menu/header-mobile-menu';

@Component({
  selector: 'sb-header',
  imports: [
    RouterLink,
    SvgIconComponent,
    HeaderDesktopNav,
    HeaderMobileMenu
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  protected readonly headerStore = inject(HeaderStore);
}
