import { Observable, Subject } from 'rxjs';

export interface OverlayCloseOptions {
  skipAnimation?: boolean;
}

export class OverlayRef<R = void> {
  private readonly _beforeClosed$ = new Subject<R | undefined>();
  private readonly _closed$ = new Subject<R | undefined>();
  public readonly beforeClosed$: Observable<R | undefined> = this._beforeClosed$.asObservable();
  public readonly closed$: Observable<R | undefined> = this._closed$.asObservable();
  private _isClosing = false;
  private _isClosed = false;

  constructor(
    private readonly requestClose: (result: R | undefined, options: OverlayCloseOptions) => void,
  ) {}

  public close(result?: R, options: OverlayCloseOptions = {}): void {
    if (this._isClosing || this._isClosed) {
      return;
    }

    this._isClosing = true;
    this._beforeClosed$.next(result);
    this._beforeClosed$.complete();
    this.requestClose(result, options);
  }

  public notifyClosed(result?: R): void {
    if (this._isClosed) {
      return;
    }

    this._isClosed = true;
    this._closed$.next(result);
    this._closed$.complete();
  }
}
