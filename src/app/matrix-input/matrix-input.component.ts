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

  matrixRows: string[][] = [];
  showNError!: boolean; 
  showMatrixInput!: boolean;
  answer!: number ;
  failedLengthCheck!: boolean;
  failedIntegerCheck!: boolean;
  failedIntegerSizeCheck!: boolean;
  

  setSize(form: NgForm) {
    this.matrixRows = [];
    if (form.value.n > 1 ){
      this.showNError = false;
      this.showMatrixInput = true;
      for (let i = 0; i < form.value.n; i++) {
        this.matrixRows.push([]);
      }
    } else {
      this.showMatrixInput = false;
      this.showNError = true;
    }
  };

  integerCheck(seperatedString: string[]): boolean {
    return seperatedString.every(entry => !isNaN(Number(entry)) && Number.isInteger(Number(entry)));
  };

  lengthCheck(seperatedString: string[]): boolean {
    return seperatedString.length === this.matrixRows.length;
  };

  integerSizeCheck(seperatedString: string[]): boolean {
    return seperatedString.every(entry => (Number(entry) > -100) && (Number(entry) < 100));
  };

  calculateSum(numbers: number[]): number{
    return numbers.reduce(((accumulator, currentValue) => accumulator + currentValue), 0);
  };

  matrixSubmit(form: NgForm) {
    const leftToRight: number[] = [];
    const rightToLeft: number[] = [];
    const seperatedRows = form.value.matrix.split('\n');
    const sepratedEntries = seperatedRows.map((row: string) => row.trim().split(' '))
    console.log(sepratedEntries)
    this.failedLengthCheck = !this.lengthCheck(sepratedEntries);
    this.failedIntegerCheck = !this.integerCheck(sepratedEntries);
    this.failedIntegerSizeCheck = !this.integerSizeCheck(sepratedEntries);
    if (!this.failedLengthCheck && !this.failedIntegerCheck && !this.failedIntegerSizeCheck) {
      leftToRight.push(Number(sepratedEntries[rowNumber]));
      rightToLeft.push(Number(sepratedEntries[(this.matrixRows.length - Number(rowNumber) - 1)]))
    }
  }

  // matrixSubmit(form: NgForm) {
  //   const leftToRight: number[] = [];
  //   const rightToLeft: number[] = [];
  //   for (const rowNumber in form.value) {
  //     const seperatedRow = form.value[rowNumber].split(" ").filter((str: string) => str.length > 0); 
  //     //Filter is needed in case the string ends with a space. Otherwise an empty entry would be added.
  //     this.failedLengthCheck = !this.lengthCheck(seperatedRow);
  //     this.failedIntegerCheck = !this.integerCheck(seperatedRow);
  //     this.failedIntegerSizeCheck = !this.integerSizeCheck(seperatedRow);
  //     if (!this.failedLengthCheck && !this.failedIntegerCheck && !this.failedIntegerSizeCheck) {
  //       leftToRight.push(Number(seperatedRow[rowNumber]));
  //       rightToLeft.push(Number(seperatedRow[(this.matrixRows.length - Number(rowNumber) - 1)]))
  //     } 
  //   }
  //   this.answer = Math.abs(this.calculateSum(leftToRight) - this.calculateSum(rightToLeft))
  // }
}

