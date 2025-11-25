import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientCard } from './ingredient-card';
import {Component, Input, provideZonelessChangeDetection} from '@angular/core';
import {provideAngularSvgIcon, SvgIconComponent} from 'angular-svg-icon';

const INGREDIENT = {
  _id: '1',
  name: 'Булка светлая',
  type: 'bun',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 50,
  image: '/assets/bun.png',
  image_mobile: '',
  image_large: '',
  __v: 0,
} as const;

// eslint-disable-next-line @angular-eslint/component-selector
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

describe('IngredientCard', () => {
  let component: IngredientCard;
  let fixture: ComponentFixture<IngredientCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientCard],
      providers: [provideZonelessChangeDetection(), provideAngularSvgIcon()]
    })
      .overrideComponent(IngredientCard, {
        remove: { imports: [SvgIconComponent] },
        add: {
          imports: [SvgIconStub],
        },
      })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('ingredient', INGREDIENT);
    fixture.componentRef.setInput('counter', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ingredient name', () => {
    const nameEl: HTMLElement = fixture.nativeElement.querySelector('.name');
    expect(nameEl.textContent?.trim()).toBe('Булка светлая');
  });

  it('should render ingredient price', () => {
    const priceEl: HTMLElement = fixture.nativeElement.querySelector('.price__amount');
    expect(priceEl.textContent?.trim()).toBe('50');
  });

  it('should emit add event with ingredient on button click', () => {
    spyOn(component.add, 'emit');

    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button.button');

    button.click();

    expect(component.add.emit).toHaveBeenCalledWith(INGREDIENT);
  });

  it('should not render counter if counter is 0', () => {
    const counterEl = fixture.nativeElement.querySelector('.counter');
    expect(counterEl).toBeNull();
  });

  it('should render counter if counter is > 0', () => {
    fixture.componentRef.setInput('counter', 3);
    fixture.detectChanges();

    const counterEl: HTMLElement =
      fixture.nativeElement.querySelector('.counter');
    expect(counterEl).not.toBeNull();
    expect(counterEl.textContent?.trim()).toBe('3');
  });

  it('the button should have the text "Добавить"', () => {
    const ingredientCardElement: HTMLElement = fixture.nativeElement;
    const button = ingredientCardElement.querySelector('button')!;
    expect(button.textContent).toContain('Добавить');
  });
});
