import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ConstructorStore } from './data/constructor.store';
import { IngredientCard } from './ui/ingredient-card/ingredient-card';
import { INGREDIENT_TYPE, IngredientType } from './data/models';
import { Overlay, OverlayHandle } from '../core/overlay/overlay';
import { BasketBottomSheet } from './ui/basket-bottom-sheet/basket-bottom-sheet';
import { take } from 'rxjs';

@Component({
  selector: 'sb-constructor',
  imports: [IngredientCard],
  templateUrl: './constructor.html',
  styleUrl: './constructor.scss',
})
export class Constructor implements AfterViewInit {
  protected readonly constructorStore = inject(ConstructorStore);
  private readonly _overlayService = inject(Overlay);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sectionOrder: readonly IngredientType[] = [
    INGREDIENT_TYPE.BUN,
    INGREDIENT_TYPE.SAUCE,
    INGREDIENT_TYPE.MAIN,
  ];
  private scrollRafId: number | null = null;

  @ViewChildren('sectionTitle', { read: ElementRef })
  private readonly sectionTitles!: QueryList<ElementRef<HTMLHeadingElement>>;

  @ViewChild('tabs', { read: ElementRef })
  private readonly tabsRef?: ElementRef<HTMLDivElement>;

  protected activeTab = signal<IngredientType>(INGREDIENT_TYPE.BUN);

  private bottomSheetRef: OverlayHandle<BasketBottomSheet> | null = null;
  protected readonly INGREDIENT_TYPE = INGREDIENT_TYPE;

  constructor() {
    this._initBottomSheetEffect();
  }

  public ngAfterViewInit(): void {
    this.syncActiveTabWithViewport();

    const scrollHandler = (): void => {
      if (this.scrollRafId !== null) {
        return;
      }

      this.scrollRafId = window.requestAnimationFrame(() => {
        this.scrollRafId = null;
        this.syncActiveTabWithViewport();
      });
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', scrollHandler);
      if (this.scrollRafId !== null) {
        window.cancelAnimationFrame(this.scrollRafId);
      }
    });
  }

  protected scrollToSection(type: IngredientType): void {
    this.activeTab.set(type);
    this.getSectionHeading(type)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  private syncActiveTabWithViewport(): void {
    const sections = this.sectionOrder
      .map((type) => ({ type, element: this.getSectionHeading(type) }))
      .filter(
        (item): item is { type: IngredientType; element: HTMLHeadingElement } =>
          item.element !== null,
      );

    if (sections.length === 0) {
      return;
    }

    const targetLine = this.getTargetLineY();
    let closest = sections[0];
    let minDistance = Number.POSITIVE_INFINITY;

    for (const section of sections) {
      const distance = Math.abs(section.element.getBoundingClientRect().top - targetLine);
      if (distance < minDistance) {
        minDistance = distance;
        closest = section;
      }
    }

    if (this.activeTab() !== closest.type) {
      this.activeTab.set(closest.type);
    }
  }

  private getSectionHeading(type: IngredientType): HTMLHeadingElement | null {
    const index = this.sectionOrder.indexOf(type);
    if (index === -1) {
      return null;
    }

    return this.sectionTitles.get(index)?.nativeElement ?? null;
  }

  private getTargetLineY(): number {
    const tabsBottom = this.tabsRef?.nativeElement.getBoundingClientRect().bottom ?? 0;
    return tabsBottom + 8;
  }
}
