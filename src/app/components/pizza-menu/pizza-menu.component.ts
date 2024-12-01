import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { items, itemPrices, itemSizes, Item, Price, Size } from '../../data/data';

@Component({
  selector: 'app-pizza-menu',
  templateUrl: './pizza-menu.component.html',
  styleUrls: ['./pizza-menu.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PizzaMenuComponent implements OnInit {
  items: Item[] = items;
  itemPrices: Price[] = itemPrices;
  itemSizes: Size[] = itemSizes;

  pizzaMenuData: any[] = [];
  initialPizzaMenuData: any[] = [];
  activeAccordion: number | null = null;

  ngOnInit(): void {
    const savedData = localStorage.getItem('pizzaMenuData');
    if (savedData) {
      this.pizzaMenuData = JSON.parse(savedData); // Load persisted data
      this.initialPizzaMenuData = this.initializeMenuData();
    } else {
      this.pizzaMenuData = this.initializeMenuData();
      this.saveInitialData(); // Save initial state
    }
  }

  // Create pizza menu data from items, sizes, and prices
  initializeMenuData() {
    return this.items.map((item) => ({
      itemId: item.itemId,
      name: item.name,
      sizes: this.itemPrices
        .filter((price) => price.itemId === item.itemId)
        .map((price) => ({
          sizeId: price.sizeId,
          name: this.itemSizes.find((size) => size.sizeId === price.sizeId)?.name,
          price: price.price,
          checked: true,
        })),
    }));
  }

  // Save the initial menu data
  saveInitialData() {
    this.initialPizzaMenuData = JSON.parse(JSON.stringify(this.pizzaMenuData));
  }

  // Toggle accordion visibility
  toggleAccordion(index: number): void {
    this.activeAccordion = this.activeAccordion === index ? null : index;
  }

  // Reset price when a size is unchecked
  onCheckboxChange(size: any): void {
    if (!size.checked) {
      size.price = 0.0;
    }
    this.saveData();
  }

  // Update price when edited
  onPriceEdit(size: any, event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const input = keyboardEvent.target as HTMLInputElement;
    const value = parseFloat(input.value);

    if (isNaN(value) || value < 0) {
      alert('Please enter a valid positive number for the price.');
      input.value = size.price.toString(); // Reset to last valid value
    } else {
      size.price = value; // Save valid price
      this.saveData();
    }
  }

  // Undo changes for a specific pizza
  undoChanges(pizza: any): void {
    const originalPizza = this.initialPizzaMenuData.find(
      (p: any) => p.itemId === pizza.itemId
    );
    if (originalPizza) {
      const index = this.pizzaMenuData.findIndex(
        (p: any) => p.itemId === pizza.itemId
      );
      if (index !== -1) {
        this.pizzaMenuData[index] = JSON.parse(JSON.stringify(originalPizza));
      }
    }
    this.saveData();
  }

  // Check if the pizza has changes compared to the initial state
  hasChanges(pizza: any): boolean {
    const originalPizza = this.initialPizzaMenuData.find(
      (p: any) => p.itemId === pizza.itemId
    );
    return JSON.stringify(originalPizza) !== JSON.stringify(pizza);
  }

  // Persist data to localStorage
  saveData(): void {
    localStorage.setItem('pizzaMenuData', JSON.stringify(this.pizzaMenuData));
  }

  // Handle keyboard navigation for the accordion
  handleKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleAccordion(index);
      event.preventDefault();
    }
  }
}
