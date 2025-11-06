import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {SvgIconComponent} from 'angular-svg-icon';

@Component({
  selector: 'sb-header-desktop-nav',
  imports: [
    RouterLink,
    SvgIconComponent
  ],
  templateUrl: './header-desktop-nav.html',
  styleUrl: './header-desktop-nav.scss'
})
export class HeaderDesktopNav {

}
