import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  generateTwoRandomNumbers(): any {
    const firstNumber = (Math.random() * 10).toFixed(0);
    const secondNumber = (Math.random() * 5).toFixed(0);
    return [firstNumber, secondNumber]
  }

  checkResultOperation(firstNumber: number, secondNumber: number, result: number): boolean {
    return (Number(firstNumber) + Number(secondNumber)) === Number(result);
  }
}
