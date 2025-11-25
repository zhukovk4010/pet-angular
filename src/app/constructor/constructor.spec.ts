import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Constructor } from './constructor';
import {
  Component, EventEmitter,
  Input,
  Output,
  provideZonelessChangeDetection
} from '@angular/core';
import {SvgIconComponent} from 'angular-svg-icon';
import {IngredientCard} from './ui/ingredient-card/ingredient-card';
import {Ingredient, INGREDIENT_TYPE, IngredientType} from './data/models';
import {ConstructorStore} from './data/constructor.store';

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

@Component({
  selector: 'sb-ingredient-card',
  template: '',
  standalone: true,
})
class IngredientCardStubComponent {
  @Input() ingredient!: Ingredient;
  @Input() counter!: number;
  @Output() add = new EventEmitter<Ingredient>();
}

describe('Constructor', () => {
  let component: Constructor;
  let fixture: ComponentFixture<Constructor>;
  let storeSpy: jasmine.SpyObj<ConstructorStore>;

  const bunsMock: Ingredient[] = [];
  const saucesMock: Ingredient[] = [];
  const mainsMock: Ingredient[] = [];

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj<ConstructorStore>('ConstructorStore', ['ingredientsByType', 'addIngredientToBasket']);

    storeSpy.ingredientsByType.and.returnValue({
      [INGREDIENT_TYPE.BUN]: bunsMock,
      [INGREDIENT_TYPE.SAUCE]: saucesMock,
      [INGREDIENT_TYPE.MAIN]: mainsMock,
    } as Record<IngredientType, Ingredient[]>);

    await TestBed.configureTestingModule({
      imports: [Constructor, IngredientCardStubComponent],
      providers: [provideZonelessChangeDetection(), { provide: ConstructorStore, useValue: storeSpy }]
    })
      .overrideComponent(IngredientCard, {
        remove: { imports: [SvgIconComponent] },
        add: {
          imports: [SvgIconStub],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Constructor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set active tab to SAUCE and apply active class on click', () => {
    const tabs: HTMLButtonElement[] =
      fixture.nativeElement.querySelectorAll('button');

    const bunTab = tabs[0];
    const sauceTab = tabs[1];

    expect(bunTab.classList.contains('active')).toBeTrue();
    expect(sauceTab.classList.contains('active')).toBeFalse();

    sauceTab.click();
    fixture.detectChanges();

    expect(bunTab.classList.contains('active')).toBeFalse();
    expect(sauceTab.classList.contains('active')).toBeTrue();
  });
});
