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

  setSize(form: NgForm) {
    if (form.value.n > 1 ){
      for (let i = 0; i < form.value.n; i++) {
        this.matrixRows.push([])
      }
    } else {
      alert(`Please pick a number larger than 1`)
    }
  }

  calculate(form: NgForm) {
    console.log(form.value)
  }
}

