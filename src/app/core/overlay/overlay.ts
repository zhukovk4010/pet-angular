import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  InjectionToken,
  Injector,
  Type
} from '@angular/core';
import {Observable} from 'rxjs';
import {OverlayCloseOptions, OverlayRef} from './overlay-ref';

export type OverlayVariant = 'modal' | 'bottom-sheet' | 'fullscreen' | (string & {});

export interface OverlayConfig<D = unknown> {
  data?: D;
  variant?: OverlayVariant;
  hasBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  closeAnimationMs?: number;
  hostClass?: string | string[];
  panelClass?: string | string[];
  backdropClass?: string | string[];
}

export interface OverlayHandle<T, R = void> {
  componentRef: ComponentRef<T>;
  overlayRef: OverlayRef<R>;
  afterClosed$: Observable<R | undefined>;
  close: (result?: R, options?: OverlayCloseOptions) => void;
}

interface OverlayRuntime<T, R> {
  hostElement: HTMLElement;
  backdropElement: HTMLElement;
  panelElement: HTMLElement;
  componentRef: ComponentRef<T>;
  overlayRef: OverlayRef<R>;
  closeAnimationMs: number;
  escapeListener?: (event: KeyboardEvent) => void;
  isClosing: boolean;
  isClosed: boolean;
}

const DEFAULT_CLOSE_ANIMATION_MS = 280;

export const OVERLAY_REF = new InjectionToken<OverlayRef<unknown>>('OVERLAY_REF');
export const OVERLAY_DATA = new InjectionToken<unknown>('OVERLAY_DATA');

@Injectable({
  providedIn: 'root'
})
export class Overlay {
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly applicationRef = inject(ApplicationRef);
  private readonly injector = inject(Injector);
  private readonly stack: OverlayRuntime<unknown, unknown>[] = [];

  public open<T, R = void, D = unknown>(
    component: Type<T>,
    config: OverlayConfig<D> = {},
  ): OverlayHandle<T, R> {
    const hostElement = document.createElement('sb-overlay-host');
    const backdropElement = document.createElement('sb-overlay-backdrop');
    const panelElement = document.createElement('sb-overlay-pane');

    const variant = config.variant ?? 'modal';
    const hasBackdrop = config.hasBackdrop ?? variant !== 'bottom-sheet';
    hostElement.classList.add('sb-overlay-host');
    hostElement.dataset['state'] = 'open';
    hostElement.dataset['variant'] = variant;

    backdropElement.classList.add('sb-overlay-backdrop');
    if (!hasBackdrop) {
      backdropElement.classList.add('sb-overlay-backdrop--hidden');
    }
    panelElement.classList.add('sb-overlay-pane');

    this.addClasses(hostElement, config.hostClass);
    this.addClasses(backdropElement, config.backdropClass);
    this.addClasses(panelElement, config.panelClass);

    hostElement.append(backdropElement, panelElement);
    document.body.append(hostElement);

    let runtimeRef: OverlayRuntime<T, R> | null = null;
    const overlayRef = new OverlayRef<R>((result, options) => {
      if (!runtimeRef) {
        return;
      }

      this.beginClose(runtimeRef, result, options);
    });

    const elementInjector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: OVERLAY_REF, useValue: overlayRef },
        { provide: OVERLAY_DATA, useValue: config.data ?? null },
      ],
    });

    const componentRef = createComponent(component, {
      environmentInjector: this.environmentInjector,
      elementInjector,
      hostElement: panelElement,
    });

    this.applicationRef.attachView(componentRef.hostView);

    const runtime: OverlayRuntime<T, R> = {
      hostElement,
      backdropElement,
      panelElement,
      componentRef,
      overlayRef,
      closeAnimationMs: config.closeAnimationMs ?? DEFAULT_CLOSE_ANIMATION_MS,
      isClosing: false,
      isClosed: false,
    };
    runtimeRef = runtime;

    if (hasBackdrop && config.closeOnBackdropClick !== false) {
      backdropElement.addEventListener('click', () => overlayRef.close());
    }

    if (config.closeOnEscape !== false) {
      runtime.escapeListener = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && this.isTop(runtime)) {
          overlayRef.close();
        }
      };
      document.addEventListener('keydown', runtime.escapeListener);
    }

    this.stack.push(runtime as OverlayRuntime<unknown, unknown>);

    return {
      componentRef,
      overlayRef,
      afterClosed$: overlayRef.closed$,
      close: (result?: R, options: OverlayCloseOptions = {}) => overlayRef.close(result, options),
    };
  }

  private beginClose<T, R>(
    runtime: OverlayRuntime<T, R>,
    result: R | undefined,
    options: OverlayCloseOptions,
  ): void {
    if (runtime.isClosing || runtime.isClosed) {
      return;
    }

    runtime.isClosing = true;
    runtime.hostElement.dataset['state'] = 'closing';

    if (options.skipAnimation || runtime.closeAnimationMs <= 0) {
      this.finalizeClose(runtime, result);
      return;
    }

    this.waitForCloseAnimation(
      [runtime.hostElement, runtime.panelElement, runtime.backdropElement],
      runtime.closeAnimationMs,
    ).then(() => this.finalizeClose(runtime, result));
  }

  private finalizeClose<T, R>(runtime: OverlayRuntime<T, R>, result: R | undefined): void {
    if (runtime.isClosed) {
      return;
    }

    runtime.isClosed = true;
    this.detachEscape(runtime);
    this.applicationRef.detachView(runtime.componentRef.hostView);
    runtime.componentRef.destroy();
    runtime.hostElement.remove();
    this.removeFromStack(runtime);
    runtime.overlayRef.notifyClosed(result);
  }

  private waitForCloseAnimation(elements: HTMLElement[], fallbackMs: number): Promise<void> {
    return new Promise((resolve) => {
      let done = false;
      const cleanups: (() => void)[] = [];
      const finish = (): void => {
        if (done) {
          return;
        }

        done = true;
        cleanups.forEach((cleanup) => cleanup());
        resolve();
      };

      const timeoutId = window.setTimeout(finish, fallbackMs);
      cleanups.push(() => window.clearTimeout(timeoutId));

      for (const element of elements) {
        const onEnd = (): void => finish();
        element.addEventListener('animationend', onEnd, { once: true });
        element.addEventListener('transitionend', onEnd, { once: true });

        cleanups.push(() => {
          element.removeEventListener('animationend', onEnd);
          element.removeEventListener('transitionend', onEnd);
        });
      }
    });
  }

  private detachEscape<T, R>(runtime: OverlayRuntime<T, R>): void {
    if (!runtime.escapeListener) {
      return;
    }

    document.removeEventListener('keydown', runtime.escapeListener);
    runtime.escapeListener = undefined;
  }

  private isTop<T, R>(runtime: OverlayRuntime<T, R>): boolean {
    const top = this.stack.at(-1);
    return top === (runtime as OverlayRuntime<unknown, unknown>);
  }

  private removeFromStack<T, R>(runtime: OverlayRuntime<T, R>): void {
    const target = runtime as OverlayRuntime<unknown, unknown>;
    const index = this.stack.lastIndexOf(target);
    if (index === -1) {
      return;
    }

    this.stack.splice(index, 1);
  }

  private addClasses(element: HTMLElement, classes?: string | string[]): void {
    if (!classes) {
      return;
    }

    const values = Array.isArray(classes) ? classes : [classes];
    element.classList.add(...values.filter(Boolean));
  }
}
