import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('(2) DataService test', () : void => {
  let service: DataService;

  beforeEach(() : void => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created correctly', () : void => {
    expect(service).toBeTruthy();
  });

  it('test random numbers generation', () : void => {
    // Se hace uso de la función en el servicio
    const [firstNumber, secondNumber] = service.generateTwoRandomNumbers();
    const result = firstNumber + secondNumber;
    // Verificamos que el resultado sea un número (expresión regular)
    expect(result).toMatch(/\d{1,}/);
  });

  it('check operation math', () : void => {
    const firstNumber = 5;
    const secondNumber = 5;
    const result = firstNumber + secondNumber;
    const check = service.checkResultOperation(firstNumber, secondNumber, result);
    expect(check).toBeTrue();
  });

});
