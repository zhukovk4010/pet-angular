import {Component, inject, OnInit} from '@angular/core';
import {ConstructorStore} from './data/constructor.store';

@Component({
  selector: 'app-constructor',
  imports: [],
  templateUrl: './constructor.html',
  styleUrl: './constructor.scss'
})
export class Constructor implements OnInit {
  protected readonly constructorStore = inject(ConstructorStore);

  public ngOnInit(): void {
    this.constructorStore.getIngredients();
  }
}
