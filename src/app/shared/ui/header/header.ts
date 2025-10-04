import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {SvgIconComponent} from 'angular-svg-icon';
import {HeaderDesktopNav} from './header-desktop-nav/header-desktop-nav';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    SvgIconComponent,
    HeaderDesktopNav
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
