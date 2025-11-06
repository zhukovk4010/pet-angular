import {Component, input} from '@angular/core';
import {Ingredient} from '../../data/models';
import {SvgIconComponent} from 'angular-svg-icon';

@Component({
  selector: 'sb-ingredient-card',
  imports: [
    SvgIconComponent
  ],
  templateUrl: './ingredient-card.html',
  styleUrl: './ingredient-card.scss'
})
export class IngredientCard {
  public readonly ingredient = input.required<Ingredient>();
}
