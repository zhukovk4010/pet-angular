import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngredientsApi {
  private readonly _httpClient = inject(HttpClient)

  private _apiUrl = 'https://norma.nomoreparties.space/api/ingredients'

  public getIngredients() {
    return this._httpClient.get(this._apiUrl)
  }
}
