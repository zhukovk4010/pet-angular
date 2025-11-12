import {computed, Injectable, signal} from '@angular/core';
import {ingredientsData} from './ingredients.data';
import {Ingredient, INGREDIENT_TYPE} from './models';

@Injectable({
    providedIn: 'root'
  })
export class ConstructorStore {
  public readonly ingredientsData = signal<readonly Ingredient[]>(ingredientsData);
  public readonly bun = signal<Ingredient | null>(null)
  public readonly items = signal<readonly Ingredient[]>([]) // sauce and main

  public readonly ingredientsByType = computed(() => {
    const all = this.ingredientsData();
    return {
      [INGREDIENT_TYPE.BUN]: all.filter(i => i.type === INGREDIENT_TYPE.BUN),
      [INGREDIENT_TYPE.SAUCE]: all.filter(i => i.type === INGREDIENT_TYPE.SAUCE),
      [INGREDIENT_TYPE.MAIN]: all.filter(i => i.type === INGREDIENT_TYPE.MAIN),
    } as const;
  })

  private readonly _countsById = computed(() => {
    const m = new Map<string, number>();
    const b = this.bun();
    if (b) m.set(b._id, 2);
    for (const i of this.items()) m.set(i._id, (m.get(i._id) ?? 0) + 1);
    return m;
  });

  public countById = (id: string) => this._countsById().get(id) ?? 0;

  public addBun(ingredient: Ingredient): void {
    this.bun.set(ingredient)
  }

  public addIngredientToBasket(ingredient: Ingredient): void {
    this.items.update(ingredients => [...ingredients, ingredient])
  }
}
