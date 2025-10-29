import {inject, Injectable} from '@angular/core';
import {IngredientsApi} from './ingredients.api';

@Injectable({
    providedIn: 'root'
  })
export class ConstructorStore {
  private readonly ingredientsApiService = inject(IngredientsApi);

  public getIngredients() {
    this.ingredientsApiService.getIngredients().subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
