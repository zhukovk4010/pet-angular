import {Component, inject} from '@angular/core';
import {ConstructorStore} from './data/constructor.store';
import {IngredientCard} from './ui/ingredient-card/ingredient-card';
import {Button} from '../shared/ui/button/button';
import {INGREDIENT_TYPE} from './data/models';


@Component({
  selector: 'sb-constructor',
  imports: [
    IngredientCard,
    Button

  ],
  templateUrl: './constructor.html',
  styleUrl: './constructor.scss'
})
export class Constructor {
  protected readonly constructorStore = inject(ConstructorStore);
  protected readonly INGREDIENT_TYPE = INGREDIENT_TYPE;
}
