import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'calculator-angular';
  currentNumber = "";
  previousNumber = "";
  operator = "";

  appendNumber(number: string) {
    this.currentNumber += number;
  }

  clearScreen() {
    this.currentNumber = "";
    this.previousNumber = "";
    this.operator = "";
  }

  appendOperator(op: string) {
    if (this.currentNumber === "") return;
    this.previousNumber = this.currentNumber;
    this.currentNumber = "";
    this.operator = op;
  }

  calculate() {
    if (this.currentNumber === "" || this.operator === "") return;
    let result = 0;
    switch (this.operator) {
      case "+":
        result = parseFloat(this.previousNumber) + parseFloat(this.currentNumber);
        break;
      case "-":
        result = parseFloat(this.previousNumber) - parseFloat(this.currentNumber);
        break;
      case "*":
        result = parseFloat(this.previousNumber) * parseFloat(this.currentNumber);
        break;
      case "/":
        result = parseFloat(this.previousNumber) / parseFloat(this.currentNumber);
        break;
    }
    this.currentNumber = result.toString();
    this.previousNumber = "";
    this.operator = "";
  }
}
