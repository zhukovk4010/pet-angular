import {Component, inject} from '@angular/core';
import {ConstructorStore} from './data/constructor.store';
import {IngredientCard} from './ui/ingredient-card/ingredient-card';
import {Button} from '../shared/ui/button/button';


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
}
