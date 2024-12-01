import { Component } from '@angular/core';
import { PizzaMenuComponent } from './components/pizza-menu/pizza-menu.component';

@Component({
  selector: 'app-root',
  imports: [PizzaMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PizzaMenuTask';
}
