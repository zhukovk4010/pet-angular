import { Component } from '@angular/core';
import { Header } from './shared/ui/header/header';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'sb-constructor',
  imports: [
    RouterOutlet,
    Header
  ],
  template: `
    <div>
      <sb-header />
      <main>
        <router-outlet />
      </main>
    </div>
  `
})
export class AppShell {

}
