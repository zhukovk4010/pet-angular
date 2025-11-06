import {computed, Injectable, signal} from '@angular/core';
import {ingredientsData} from './ingredients.data';
import {Ingredient, INGREDIENT_TYPE} from './models';

@Injectable({
    providedIn: 'root'
  })
export class ConstructorStore {
  public readonly ingredientsData = signal<Ingredient[]>(ingredientsData);

  public readonly ingredientsBunsData = computed(() => {
    return this.ingredientsData().filter(ingredient => ingredient.type === INGREDIENT_TYPE.BUN)
  })

  public readonly ingredientsMainData = computed(() => {
    return this.ingredientsData().filter(ingredient => ingredient.type === INGREDIENT_TYPE.MAIN)
  })

  public readonly ingredientsSauceData = computed(() => {
    return this.ingredientsData().filter(ingredient => ingredient.type === INGREDIENT_TYPE.SAUCE)
  })
}
