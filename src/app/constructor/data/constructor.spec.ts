import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { INGREDIENT_TYPE } from './models';
import { ConstructorStore } from './constructor.store';

describe('ConstructorStore', () => {
  let store: ConstructorStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConstructorStore, provideZonelessChangeDetection()],
    });

    store = TestBed.inject(ConstructorStore);
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('should set active tab', () => {
    store.setActiveTab(INGREDIENT_TYPE.SAUCE);

    expect(store.activeTab()).toBe(INGREDIENT_TYPE.SAUCE);
  });

  it('should sync active tab with closest section in viewport', () => {
    store.syncActiveTabWithViewport(
      [
        { type: INGREDIENT_TYPE.BUN, top: 220 },
        { type: INGREDIENT_TYPE.SAUCE, top: 100 },
        { type: INGREDIENT_TYPE.MAIN, top: 360 },
      ],
      120,
    );

    expect(store.activeTab()).toBe(INGREDIENT_TYPE.SAUCE);
  });
});
