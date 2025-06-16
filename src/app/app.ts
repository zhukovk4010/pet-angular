import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NavigationPanel
} from '../components/widgets/navigation-panel/navigation-panel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}

