import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';

describe(`(3) Tests in 'AuthService'`, (): void => {
  let service: AuthService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach((): void => {
    // Se emula el comportamiento de una api
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new AuthService(httpClientSpy as any);
  });

  it('should be created correctly', (): void => {
    expect(service).toBeTruthy();
  });

  // Se usa el done para pruebas asíncronas
  it('should be return a correct object when (valid login)', (done: DoneFn): void => {
    // Mock de credenciales
    const mockUserCredentials = {
      email: 'bryan@gmail.com',
      password: '123456',
    };

    // Mock de resultado de la Api
    const mockApiResult = [
      {
        id: 1,
        name: 'Bryan Aguilar',
        email: 'bryan@gmail.com',
        password: '123456',
      },
      {
        id: 2,
        name: 'Alexander Aguilar',
        email: 'alexander@gmail.com',
        password: '123456',
      },
    ];

    const mockResultLogin = {
      error: false,
      msg: 'Succes Login',
      data: {
        id: 1,
        name: 'Bryan Aguilar',
        email: 'bryan@gmail.com',
        password: '123456',
      },
    };

    httpClientSpy.get.and.returnValue(of(mockApiResult)); // El valor que retorna debe ser un observable
    service.login(mockUserCredentials).subscribe((r): void => {
      expect(r).toEqual(mockResultLogin);
      done();
    });
  });

  it('should be return null object when (invalid login)', (done: DoneFn): void => {
    // Mock de credenciales
    const mockUserCredentials = {
      email: 'bryan@gmail.com',
      password: '12345678',
    };

    // Mock de resultado de la Api
    const mockApiResult = [
      {
        id: 1,
        name: 'Bryan Aguilar',
        email: 'bryan@gmail.com',
        password: '123456',
      },
      {
        id: 2,
        name: 'Alexander Aguilar',
        email: 'alexander@gmail.com',
        password: '123456',
      },
    ];

    const mockResultLogin = {
      error: false,
      msg: 'Failed Login',
      data: null,
    };

    httpClientSpy.get.and.returnValue(of(mockApiResult)); // El valor que retorna debe ser un observable
    service.login(mockUserCredentials).subscribe((r): void => {
      expect(r).toEqual(mockResultLogin);
      done();
    });
  });

  it('should b return data null when (error to login)', (done: DoneFn): void => {
    
    const mockUserCredentials = {
      email: 'bryan@gmail.com',
      password: '123456',
    };

    const mockResultError = {
      error: true,
      msg: 'Error to login',
      data: null,
    };

    httpClientSpy.get.and.returnValue(throwError((): Error => new Error()));
    service.login(mockUserCredentials).subscribe(( r => {
      expect(r).toEqual(mockResultError);
      done();
    }));
  });
});
