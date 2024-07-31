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
  passedHeightCheck!: boolean;
  passedLengthCheck!: boolean;
  passedIntegerCheck!: boolean;
  passedIntegerSizeCheck!: boolean;
  leftToRight!: number[];
  rightToLeft!: number[];
  leftToRightSum!: number;
  rightToLeftSum!: number;
  
  setSize(form: NgForm) {
    console.log(form.value.n)
    console.log(form.value.matrix)
    console.log(`This is the type of form.value.matrix: ${typeof(form.value.matrix)}`)
      if (form.value.n > 1 && Number.isInteger(form.value.n)){
      this.matrixSize = form.value.n
      this.showNError = false;
      this.matrixValidate(form.value.matrix);
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

  matrixValidate(matrix: string) {
    let seperatedRows = [];
    let separatedEntries = []
    // console.log(this.matrixSize)
    seperatedRows = matrix.split('\n');
    console.log('This is seperatedRows:' + seperatedRows +'. Which has the type:' + typeof(seperatedRows))
    console.log(seperatedRows)
    separatedEntries = seperatedRows.map((row: string) => row.trim().split(' '))
    console.log('This is seperatedEntries' + separatedEntries)
    // this.passedHeightCheck = this.heightCheck(separatedEntries, this.matrixSize);
    // this.passedIntegerCheck = separatedEntries.every(this.integerCheck);
    // this.passedIntegerSizeCheck = separatedEntries.every(this.integerSizeCheck);
    // this.passedLengthCheck = separatedEntries.every((element: string[]) => this.lengthCheck(element, this.matrixSize))
    // // console.log(this.matrixSize)
    // // console.log(separatedEntries.every(this.lengthCheck, this.matrixSize))
    // // console.log(seperatedRows)
    // if (this.passedHeightCheck && this.passedIntegerCheck && this.passedIntegerSizeCheck && this.passedLengthCheck) {
    //   this.matrixCalculate(separatedEntries);
    // }
  }

  // matrixCalculate(matrix: string[]) {
  //   this.leftToRight = [];
  //   this.rightToLeft = [];
  //   // console.log(matrix)
  //   for (const row in matrix) {
  //     this.leftToRight.push(Number(matrix[row][row]));
  //     this.rightToLeft.push(Number(matrix[row][(this.matrixSize - Number(row) - 1)]))
  //   }
  //   this.leftToRightSum = this.calculateSum(this.leftToRight);
  //   this.rightToLeftSum = this.calculateSum(this.rightToLeft);
  //   this.answer = Math.abs(this.leftToRightSum - this.rightToLeftSum);
  // }


}

