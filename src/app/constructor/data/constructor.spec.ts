import {TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {ConstructorStore} from './constructor.store';

describe('HeaderStore', () => {
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
});
