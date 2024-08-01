import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-matrix-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './matrix-input.component.html',
  styleUrl: './matrix-input.component.scss'
})
export class MatrixInputComponent {
  matrixSize!: number;
  answer!: number;
  showNError!: boolean; 
  showMatrixResults!: boolean;
  passedHeightCheck = true;
  passedLengthCheck = true;
  passedIntegerCheck = true;
  passedIntegerSizeCheck = true;
  leftToRight!: number[];
  rightToLeft!: number[];
  leftToRightSum!: number;
  rightToLeftSum!: number;
  
  setSize(form: NgForm) {
      if (form.value.n > 1 && Number.isInteger(form.value.n)){
      this.matrixSize = form.value.n;
      this.showNError = false;
      this.matrixValidate(form);
    } else {
      this.showNError = true;
    }
  };

  heightCheck(seperateRows: string[], size: number) {
    return seperateRows.length === size;
  }

  integerCheck(seperateStrings: string[]): boolean {
    return seperateStrings.every(entry => !isNaN(Number(entry)) && Number.isInteger(Number(entry)));
  };

  integerSizeCheck(seperateStrings: string[]): boolean {
    return seperateStrings.every(entry => (Number(entry) > -100) && (Number(entry) < 100));
  };

  lengthCheck(seperateStrings: string[], size: number): boolean {
    return seperateStrings.length === size;
  };

  calculateSum(numbers: number[]): number{
    return numbers.reduce(((accumulator, currentValue) => accumulator + currentValue), 0);
  };

  processRow(row: string): string[] {
    return row
      .trim()
      .split(' ')
      .filter((entry: string) => entry.length > 0)
  }

  matrixValidate(form: NgForm) {
    let seperatedRows = [];
    let separatedEntries = [];
    seperatedRows = form.value.matrix.split('\n');
    // console.log(seperatedRows)
    separatedEntries = seperatedRows.map(this.processRow).filter((entry: string) => entry.length > 0);
    console.log(separatedEntries)
    this.passedHeightCheck = this.heightCheck(separatedEntries, this.matrixSize);
    this.passedIntegerCheck = separatedEntries.every(this.integerCheck);
    this.passedIntegerSizeCheck = separatedEntries.every(this.integerSizeCheck);
    this.passedLengthCheck = separatedEntries.every((element: string[]) => this.lengthCheck(element, this.matrixSize));
    console.log(this.showMatrixResults)
    console.log(this.passedHeightCheck)
    console.log(this.passedIntegerCheck)
    console.log(this.passedIntegerSizeCheck)
    console.log(this.passedLengthCheck)
    if (this.passedHeightCheck && this.passedIntegerCheck && this.passedIntegerSizeCheck && this.passedLengthCheck) {
      this.showMatrixResults = true;
      this.matrixCalculate(separatedEntries);
    };
  };

  matrixCalculate(matrix: string[]) {
    this.leftToRight = [];
    this.rightToLeft = [];
    for (const row in matrix) {
      this.leftToRight.push(Number(matrix[row][row]));
      this.rightToLeft.push(Number(matrix[row][(this.matrixSize - Number(row) - 1)]));
    }
    this.leftToRightSum = this.calculateSum(this.leftToRight);
    this.rightToLeftSum = this.calculateSum(this.rightToLeft);
    this.answer = Math.abs(this.leftToRightSum - this.rightToLeftSum);
  };
}
