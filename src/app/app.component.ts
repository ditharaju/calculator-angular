import { Component, ElementRef, ViewChild } from '@angular/core';
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
  // inputValue = document.getElementById('userinput');
  // calculate = document.querySelectorAll('.operations').forEach(function (item) {
  //   console.log(item);
  //   item.addEventListener("click", function (e) { });

  // });
  // numbers = document.querySelectorAll(".numbers").forEach(function (item) {
  //   item.addEventListener("click", function (e) {
  //     inputValue.innterText = e.target.inntertext.trim();
  //   });
  // });
  @ViewChild('userInput') userInput!: ElementRef<HTMLParagraphElement>;
  currentNumber: string = '0';
  firstNumber: number | null = null;
  operator: string | null = null;
  decimalUsed: boolean = false;

  getExpression(): string {
    return this.firstNumber === null ? this.currentNumber : `${this.firstNumber} ${this.operator} ${this.currentNumber}`;
  }

  appendNumber(number: string) {
    if (this.currentNumber === '0' || this.operator !== null) {
      this.currentNumber = number;
    } else {
      this.currentNumber += number;
    }
    this.userInput.nativeElement.innerText = this.currentNumber;
  }

  appendOperator(op: string) {
    this.calculateResult();
    this.operator = op;
    this.decimalUsed = false;
  }

  calculateResult() {
    if (this.operator === null || this.currentNumber === '') return;
    const secondNumber = parseFloat(this.currentNumber);
    let result: number;
    switch (this.operator) {
      case '+':
        result = this.firstNumber! + secondNumber;
        break;
      case '-':
        result = this.firstNumber! - secondNumber;
        break;
      case '*':
        result = this.firstNumber! * secondNumber;
        break;
      case '/':
        if (secondNumber === 0) {
          alert('Error: Division by zero!');
          return;
        }
        result = this.firstNumber! / secondNumber;
        break;
      default:
        return;
    }
    this.currentNumber = result.toString();
    this.firstNumber = result;
    this.operator = null;
  }

  allClear() {
    this.currentNumber = '0';
    this.firstNumber = null;
    this.operator = null;
    this.decimalUsed = false;
    this.userInput.nativeElement.innerText = this.currentNumber;
  }

  handleDelete() {
    if (this.currentNumber.length > 1) {
      this.currentNumber = this.currentNumber.slice(0, -1);
    } else {
      this.currentNumber = '0';
    }
    this.userInput.nativeElement.innerText = this.currentNumber;
  }

  addDecimal() {
    if (!this.decimalUsed) {
      this.currentNumber += '.';
      this.decimalUsed = true;
      this.userInput.nativeElement.innerText = this.currentNumber;
    }
  }
}
