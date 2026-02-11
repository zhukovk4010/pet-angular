import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketBottomSheet } from './basket-bottom-sheet';

describe('BasketBottomSheet', () => {
  let component: BasketBottomSheet;
  let fixture: ComponentFixture<BasketBottomSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketBottomSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketBottomSheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
