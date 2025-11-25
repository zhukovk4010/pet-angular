import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDesktopNav } from './header-desktop-nav';
import {Component, Input, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {SvgIconComponent} from 'angular-svg-icon';

@Component({
  selector: 'sb-svg-icon',
  standalone: true,
  template: '',
})
class SvgIconStub {
  @Input() src!: string;
  @Input() svgStyle?: Record<string, unknown>;
  @Input('aria-hidden') ariaHidden?: boolean;
}

describe('HeaderDesktopNav', () => {
  let component: HeaderDesktopNav;
  let fixture: ComponentFixture<HeaderDesktopNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDesktopNav],
      providers: [provideZonelessChangeDetection(), provideRouter([])]
    })
      .overrideComponent(HeaderDesktopNav, {
        remove: { imports: [SvgIconComponent] },
        add: {
          imports: [SvgIconStub],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderDesktopNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
