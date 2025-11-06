import {Injectable} from '@angular/core';
import {ingredientsData} from './ingredients.data';

@Injectable({
    providedIn: 'root'
  })
export class ConstructorStore {
  public readonly ingredientsData = ingredientsData;
}
