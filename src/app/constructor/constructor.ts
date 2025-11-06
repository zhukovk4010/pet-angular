import {Component, inject} from '@angular/core';
import {ConstructorStore} from './data/constructor.store';

@Component({
  selector: 'app-constructor',
  imports: [],
  templateUrl: './constructor.html',
  styleUrl: './constructor.scss'
})
export class Constructor {
  protected readonly constructorStore = inject(ConstructorStore);
}
