import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDesktopNav } from './header-desktop-nav';

describe('HeaderDesktopNav', () => {
  let component: HeaderDesktopNav;
  let fixture: ComponentFixture<HeaderDesktopNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDesktopNav]
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
