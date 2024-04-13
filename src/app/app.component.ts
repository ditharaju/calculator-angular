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
  calValue: number = 0;
  funcT: any = 'noFunction';
  calNumber: string = 'noValue';
  firstNumber: number = 0;
  secondNumber: number = 0;

  onClickValue(val: string, type: any) {
    if (type == 'number') {
      this.onNumberClick(val);
    }
    else if (type == 'function') {
      this.onFunctionClick(val);
    }
  }

  handleDelete() {
    // need to update this
    if (this.calNumber.length > 1) {
      this.calNumber = this.calNumber.slice(0, -1);
    } else {
      this.calNumber = '0';
    }
  }

  allClear() {
    this.calValue = 0;
    this.funcT = 'noFunction';
    this.calNumber = 'noValue';
    this.firstNumber = 0;
    this.secondNumber = 0;
  }

  onNumberClick(val: string) {
    if (this.calNumber !== 'noValue') {
      this.calNumber = this.calNumber + val;
    }
    else {
      this.calNumber = val;
    }
    this.calValue = parseFloat(this.calNumber);
  }


  onFunctionClick(val: string) {
    if (this.funcT == 'noFunction') {
      this.firstNumber = this.calValue;
      this.calValue = this.firstNumber;
      this.calNumber = 'noValue';
      this.funcT = val;
    }
    else if (this.funcT !== 'noFunction') {
      this.secondNumber = this.calValue;
      this.valueCalculate(val);
    }

  }

  valueCalculate(val: string) {
    if (this.funcT == '+') {
      const Total = this.firstNumber + this.secondNumber;
      this.totalAssignValues(Total, val);
      if (val == '=') {
        this.onEqualPress();
      }
    }
    if (this.funcT == '-') {
      const Total = this.firstNumber - this.secondNumber;
      this.totalAssignValues(Total, val);
      if (val == '=') {
        this.onEqualPress();
      }
    }
    if (this.funcT == '*') {
      const Total = this.firstNumber * this.secondNumber;
      this.totalAssignValues(Total, val);
      if (val == '=') {
        this.onEqualPress();
      }
    }
    if (this.funcT == '/') {
      if (this.secondNumber === 0) {
        alert('Error: Division by zero!');
        this.allClear();
        return;
      }
      const Total = this.firstNumber / this.secondNumber;
      this.totalAssignValues(Total, val);
      if (val == '=') {
        this.onEqualPress();
      }
    }
    if (this.funcT == '%') {
      const Total = this.firstNumber / 100;
      this.totalAssignValues(Total, val);
      this.onEqualPress();

    }
  }

  onEqualPress() {
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.calNumber = 'noValue';
    this.funcT = 'noFunction';
  }

  totalAssignValues(Total: number, val: string) {
    this.calValue = Total;
    this.firstNumber = Total;
    this.secondNumber = this.firstNumber;
    this.calNumber = 'noValue';
    this.funcT = val;
  }

}