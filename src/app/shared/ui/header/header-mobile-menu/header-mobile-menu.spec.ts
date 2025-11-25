import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMobileMenu } from './header-mobile-menu';
import {provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

describe('HeaderMobileMenu', () => {
  let component: HeaderMobileMenu;
  let fixture: ComponentFixture<HeaderMobileMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMobileMenu],
      providers: [provideZonelessChangeDetection(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderMobileMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
