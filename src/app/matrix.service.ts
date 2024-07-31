import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  heightCheck(matrix: string[][], size: number): boolean {
    return matrix.length === size;
  }

  integerCheck(row: string[]): boolean {
    return row.every(entry => !isNaN(Number(entry)) && Number.isInteger(Number(entry)));
  }

  integerSizeCheck(row: string[]): boolean {
    return row.every(entry => (Number(entry) >= -100) && (Number(entry) <= 100));
  }

  lengthCheck(row: string[], size: number): boolean {
    return row.length === size;
  }

  processRow(row: string): string[] {
    return row.trim().split(/\s+/).filter(entry => entry.length > 0);
  }

  calculateDiagonalSums(matrix: string[][], size: number): { leftToRightSum: number, rightToLeftSum: number } {
    let leftToRightSum = 0;
    let rightToLeftSum = 0;

    for (let i = 0; i < size; i++) {
      leftToRightSum += Number(matrix[i][i]);
      rightToLeftSum += Number(matrix[i][size - i - 1]);
    }

    return { leftToRightSum, rightToLeftSum };
  }

  validateMatrix(matrix: string[][], size: number): boolean {
    return (
      this.heightCheck(matrix, size) &&
      matrix.every(row => this.integerCheck(row)) &&
      matrix.every(row => this.integerSizeCheck(row)) &&
      matrix.every(row => this.lengthCheck(row, size))
    );
  }
}