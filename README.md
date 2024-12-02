# Pizza Menu Task

## Task Description
This application is an interactive web-based solution for creating and managing a pizza menu. The user can:
- Select the size and costumize price of each pizza.
- Revert changes made to a pizza (Undo functionality).
- Save the menu locally (using local storage) to persist changes after a refresh.
- Navigate using the keyboard and benefit from **accessibility** features.

![image](https://github.com/user-attachments/assets/834cdcb6-e124-487a-8085-4af23e32c63a)
![image](https://github.com/user-attachments/assets/d3840ef0-9d5c-4261-a08a-2016aa2e86b0)



## Structure

### **1. data.ts**
- The `data.ts` file contains the data for pizzas, sizes, and prices.
- We use `export` to share the data across different components.

### **2. Components**

#### Pizza Menu Component
Responsible for presenting and managing the entire pizza menu.

##### Features:
- Logic for local storage.
- Detects changes and reverts them with undo functionality.
- Toggles accordion items (expand/collapse options for each pizza).

#### Pizza Item Component
A child component that manages the size and price options for each pizza.

##### Features:
- Checkbox selection for sizes.
- Price input with validation (e.g., positive numbers only).
- Undo logic to revert local changes.

### **3. Local Storage**
Used to save changes to prices and options.

#### Logic:
- During the `ngOnInit` lifecycle of the Pizza Menu Component, data is loaded from `localStorage` if available.
- When the user makes changes and presses enter, the state is automatically saved.

### **4. Accessibility**
The application is optimized for users with low vision or those using screen readers.

#### Key Features:
- Use of `aria-label` to describe the functionality of each button and input. Tested with screen reader (ChromeVox)
- Keyboard navigation:
 Tab to switch between options.
 Enter/Space to expand/collapse the accordion.
Result of automated tool Lighthouse :

![image](https://github.com/user-attachments/assets/c0037002-c696-4fe0-999b-06cd9daf97b3)


### **5. Undo Logic**
If the user clicks the icon "Undo" the initial state is restored.

## Technologies
- Angular for component creation and state management. v19.0.2
- CSS for design and styling.
- Local Storage for persisting user changes.

## Installation Instructions
**1. Clone the repository:**
```bash
git clone https://github.com/marinelakal/company-task.git
cd <repository-folder>
```
**2. Install dependencies:**
```bash
npm install
```
**3. Start the application:**
```bash
ng serve
```
**4. Open the app:**
Navigate to http://localhost:4200 in your browser.
