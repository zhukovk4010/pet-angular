import {
  Component,
  Input,
  provideZonelessChangeDetection
} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import { Header } from './header';
import {provideRouter} from '@angular/router';
import {provideAngularSvgIcon, SvgIconComponent} from 'angular-svg-icon';
import {HeaderDesktopNav} from './header-desktop-nav/header-desktop-nav';
import {HeaderMobileMenu} from './header-mobile-menu/header-mobile-menu';

@Component({
  selector: 'svg-icon',
  standalone: true,
  template: '',
})
class SvgIconStub {
  @Input() src!: string;
  @Input() svgStyle?: Record<string, unknown>;
  @Input('aria-hidden') ariaHidden?: boolean;
}

@Component({
  selector: 'sb-header-mobile-menu',
  template: '',
  standalone: true,
})
class HeaderMobileMenuStub {}

@Component({
  selector: 'sb-header-desktop-nav',
  template: '',
  standalone: true,
})
class HeaderDesktopNavStub {}

describe('Header', () => {
  let header: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideZonelessChangeDetection(), provideRouter([]), provideAngularSvgIcon()]
    })
      .overrideComponent(Header, {
        remove: { imports: [SvgIconComponent, HeaderDesktopNav, HeaderMobileMenu] },
        add: {
          imports: [SvgIconStub, HeaderMobileMenuStub, HeaderDesktopNavStub],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Header);
    header = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(header).toBeTruthy();
  });
});
