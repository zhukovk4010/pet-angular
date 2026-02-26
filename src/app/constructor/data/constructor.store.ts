import { computed, Injectable, signal } from '@angular/core';
import { ingredientsData } from './ingredients.data';
import { Ingredient, INGREDIENT_TYPE, IngredientType } from './models';

@Injectable({
  providedIn: 'root',
})
export class ConstructorStore {
  public readonly ingredientsData = signal<readonly Ingredient[]>(ingredientsData);
  public readonly bun = signal<Ingredient | null>(null);
  public readonly items = signal<readonly Ingredient[]>([]); // sauce and main
  public readonly sectionOrder: readonly IngredientType[] = [
    INGREDIENT_TYPE.BUN,
    INGREDIENT_TYPE.SAUCE,
    INGREDIENT_TYPE.MAIN,
  ];
  public readonly activeTab = signal<IngredientType>(INGREDIENT_TYPE.BUN);

  public readonly ingredientsByType = computed(() => {
    const all = this.ingredientsData();
    return {
      [INGREDIENT_TYPE.BUN]: all.filter((i) => i.type === INGREDIENT_TYPE.BUN),
      [INGREDIENT_TYPE.SAUCE]: all.filter((i) => i.type === INGREDIENT_TYPE.SAUCE),
      [INGREDIENT_TYPE.MAIN]: all.filter((i) => i.type === INGREDIENT_TYPE.MAIN),
    } as const;
  });

  public readonly basketTotal = computed((): number => {
    let total = 0;

    const bun = this.bun();

    const items = this.items();

    if (bun) {
      total += bun.price * 2;
    }

    if (items.length > 0) {
      items.forEach((ingredient) => {
        total += ingredient.price;
      });
    }

    return total;
  });

  private readonly _countsById = computed(() => {
    const m = new Map<string, number>();
    const b = this.bun();
    if (b) m.set(b._id, 2);
    for (const i of this.items()) m.set(i._id, (m.get(i._id) ?? 0) + 1);
    return m;
  });

  public countById = (id: string) => this._countsById().get(id) ?? 0;

  public addBun(ingredient: Ingredient): void {
    this.bun.set(ingredient);
  }

  public addIngredientToBasket(ingredient: Ingredient): void {
    this.items.update((ingredients) => [...ingredients, ingredient]);
  }

  public setActiveTab(type: IngredientType): void {
    if (this.activeTab() !== type) {
      this.activeTab.set(type);
    }
  }

  public syncActiveTabWithViewport(
    sections: readonly { type: IngredientType; top: number }[],
    targetLineY: number,
  ): void {
    if (sections.length === 0) {
      return;
    }

    let closest = sections[0];
    let minDistance = Number.POSITIVE_INFINITY;

    for (const section of sections) {
      const distance = Math.abs(section.top - targetLineY);
      if (distance < minDistance) {
        minDistance = distance;
        closest = section;
      }
    }

    this.setActiveTab(closest.type);
  }
}
