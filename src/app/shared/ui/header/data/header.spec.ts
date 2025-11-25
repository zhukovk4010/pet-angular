import {HeaderStore} from './header.store';
import {TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection} from '@angular/core';

describe('HeaderStore', () => {
  let store: HeaderStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderStore, provideZonelessChangeDetection()],
    });

    store = TestBed.inject(HeaderStore);
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('should have mobile menu closed by default', () => {
    expect(store.isMobileMenuOpen()).toBeFalse();
  });

  it('should have mobile menu accordion closed by default', () => {
    expect(store.isMobileMenuAccordionOpen()).toBeFalse();
  });

  it('openMobileMenu should set isMobileMenuOpen to true', () => {
    store.openMobileMenu();
    expect(store.isMobileMenuOpen()).toBeTrue();
  });

  it('closeMobileMenu should set isMobileMenuOpen to false', () => {
    store.isMobileMenuOpen.set(true); // имитируем открытое меню
    store.closeMobileMenu();
    expect(store.isMobileMenuOpen()).toBeFalse();
  });

  it('toggleMobileMenuAccordion should toggle accordion state', () => {
    // начальное состояние — false (см. сигнал в сторе)
    expect(store.isMobileMenuAccordionOpen()).toBeFalse();

    store.toggleMobileMenuAccordion();
    expect(store.isMobileMenuAccordionOpen()).toBeTrue();

    store.toggleMobileMenuAccordion();
    expect(store.isMobileMenuAccordionOpen()).toBeFalse();
  });
});
