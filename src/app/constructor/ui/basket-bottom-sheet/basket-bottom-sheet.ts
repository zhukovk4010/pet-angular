import {Component, input} from '@angular/core';
import {Button} from '../../../shared/ui/button/button';

@Component({
  selector: 'sb-basket-bottom-sheet',
  imports: [
    Button
  ],
  templateUrl: './basket-bottom-sheet.html',
  styleUrl: './basket-bottom-sheet.scss'
})
export class BasketBottomSheet {
  public readonly total = input.required<number>();
}
