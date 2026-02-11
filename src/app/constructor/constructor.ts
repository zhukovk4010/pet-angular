import {
  Component,
  DestroyRef,
  effect,
  inject,
  signal
} from '@angular/core';
import {ConstructorStore} from './data/constructor.store';
import {IngredientCard} from './ui/ingredient-card/ingredient-card';
import {INGREDIENT_TYPE, IngredientType} from './data/models';
import {Overlay, OverlayHandle} from '../core/overlay/overlay';
import {BasketBottomSheet} from './ui/basket-bottom-sheet/basket-bottom-sheet';
import {take} from 'rxjs';


@Component({
  selector: 'sb-constructor',
  imports: [
    IngredientCard,
  ],
  templateUrl: './constructor.html',
  styleUrl: './constructor.scss'
})
export class Constructor {
  protected readonly constructorStore = inject(ConstructorStore);
  private readonly _overlayService = inject(Overlay);
  private readonly destroyRef = inject(DestroyRef);

  protected activeTab = signal<IngredientType>(INGREDIENT_TYPE.BUN)

  private bottomSheetRef: OverlayHandle<BasketBottomSheet> | null = null;
  protected readonly INGREDIENT_TYPE = INGREDIENT_TYPE;

  constructor() {
    this._initBottomSheetEffect();
  }

  private _initBottomSheetEffect(): void {
    const stop = effect(() => {
      const total = this.constructorStore.basketTotal();

      if (total > 0 && !this.bottomSheetRef) {
        this.bottomSheetRef = this._overlayService.open(BasketBottomSheet, {
          variant: 'bottom-sheet',
          hasBackdrop: false,
          closeOnBackdropClick: false,
          closeOnEscape: false,
        });

        this.bottomSheetRef.componentRef.setInput('total', total);
        this.bottomSheetRef.afterClosed$.pipe(take(1)).subscribe(() => {
          this.bottomSheetRef = null;
        });
        return;
      }

      if (this.bottomSheetRef) {
        if (total <= 0) {
          this.bottomSheetRef.close();
          return;
        }

        this.bottomSheetRef.componentRef.setInput('total', total);
      }
    });

    this.destroyRef.onDestroy(() => {
      stop.destroy();
      this.bottomSheetRef?.close(undefined, { skipAnimation: true });
    });
  }
}
