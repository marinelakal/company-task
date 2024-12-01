import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PizzaItemComponent implements OnInit {
  @Input() pizza: any; // Input from parent
  @Input() index!: number; // Index input from parent
  initialState: any;

  ngOnInit(): void {
    // Save initial state for undo functionality
    this.initialState = JSON.parse(JSON.stringify(this.pizza));
  }

  onCheckboxChange(size: any): void {
    if (!size.checked) {
      size.price = 0.0; // Reset price when unchecked
    }
  }

  undoChanges(): void {
    // Revert to the initial state
    this.pizza = JSON.parse(JSON.stringify(this.initialState));
  }
}
