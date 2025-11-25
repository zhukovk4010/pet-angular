import {Component, inject, signal} from '@angular/core';
import {ConstructorStore} from './data/constructor.store';
import {IngredientCard} from './ui/ingredient-card/ingredient-card';
import {INGREDIENT_TYPE, IngredientType} from './data/models';


@Component({
  selector: 'sb-constructor',
  imports: [
    IngredientCard,
  ],
  templateUrl: './constructor.html',
  styleUrl: './constructor.scss'
})
export class Constructor {
  protected readonly constructorStore = inject(ConstructorStore);
  protected readonly INGREDIENT_TYPE = INGREDIENT_TYPE;

  protected activeTab = signal<IngredientType>(INGREDIENT_TYPE.BUN)
}
