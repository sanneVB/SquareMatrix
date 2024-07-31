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

  matrixRows: number[][] = [];
  showNError = false; 
  answer!: number 
  

  setSize(form: NgForm) {
    this.matrixRows = [];
    this.showNError = false;
    if (form.value.n > 1 ){
      this.showNError = false;
      for (let i = 0; i < form.value.n; i++) {
        this.matrixRows.push([]);
      }
    } else {
      this.showNError = true;
    }
  }

  integerCheck(seperatedString: string[]): boolean {
    return seperatedString.every(entry => !isNaN(Number(entry)) && Number.isInteger(Number(entry)));
  }

  lengthCheck(seperatedString: string[]): boolean {
    return seperatedString.length === this.matrixRows.length;
  }

  calculateSum(numbers: number[]): number{
    return numbers.reduce(((accumulator, currentValue) => accumulator + currentValue), 0);
  }

  matrixSubmit(form: NgForm) {
    const leftToRight: number[] = [];
    const rightToLeft: number[] = [];
    for (const rowNumber in form.value) {
      const seperatedRow = form.value[rowNumber].split(" ").filter((str: string) => str.length > 0); 
      //Filter is needed in case the string ends with a space. Otherwise an empty entry would be added.
      if (this.integerCheck(seperatedRow) && this.lengthCheck(seperatedRow)) {
        console.log(rowNumber);
        console.log(seperatedRow);
        console.log(seperatedRow[rowNumber]);
        console.log((this.matrixRows.length - Number(rowNumber)));
        leftToRight.push(Number(seperatedRow[rowNumber]));
        rightToLeft.push(Number(seperatedRow[(this.matrixRows.length - Number(rowNumber) - 1)]))
      }
      
      // console.log(seperatedRow);
      // console.log(this.integerCheck(seperatedRow));
      // console.log(this.lengthCheck(seperatedRow));
      console.log(leftToRight);
      console.log(rightToLeft);
    }
    // const leftToRightSum = leftToRight.reduce(((acc, cur) => acc + cur), 0);
    console.log(this.calculateSum(leftToRight));
    console.log(this.calculateSum(rightToLeft));
    this.answer = Math.abs(this.calculateSum(leftToRight) - this.calculateSum(rightToLeft))
    // console.log(this.matrixRows.length)
  }
}

