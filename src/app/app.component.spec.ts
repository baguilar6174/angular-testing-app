import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { AuthService } from '@data/services/auth.service';

// Nombre del conjunto de pruebas
describe(`(1) Test component 'AppComponent'`, () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const authServiceStub: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'authService',
    ['login']
  );

  // Este bloque se ejecuta por cada una de las pruebas
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceStub,
        },
      ],
    }).compileComponents();
  });

  // Este bloque se ejecuta por cada una de las pruebas
  beforeEach((): void => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance; // Esta variable me permite acceder a todas la spropiedades del componente
    fixture.detectChanges();
  });

  // Este bloque se ejecuta por cada una de las pruebas
  afterEach((): void => {
    fixture.destroy();
  });

  it('should create the AppComponent correctly', (): void => {
    expect(component).toBeTruthy();
  });

  it('should be return a invalid form', (): void => {
    const form = component.form;
    const email = component.form.controls['email'];
    email.setValue('bryan@gmail.com');
    expect(form.invalid).toBeTrue();
  });

  it('should be return a valid form', (): void => {
    const form = component.form;
    const email = component.form.controls['email'];
    const password = component.form.controls['password'];
    const result = component.form.controls['result'];
    email.setValue('bryan@gmail.com');
    password.setValue('123456');
    result.setValue('5');
    expect(form.invalid).toBeFalse();
  });

  it('should be show ERROR_CHECK when user result is incorrect', (): void => {
    const email = component.form.controls['email'];
    const password = component.form.controls['password'];
    const result = component.form.controls['result'];
    email.setValue('bryan@gmail.com');
    password.setValue('123456');
    result.setValue('5');
    // Hace referencia a un elemento del DOM
    const btnElement = fixture.debugElement.query(By.css('button.btn'));
    btnElement.nativeElement.click();
    const expectData = `ERROR_CHECK`;
    expect(component.isCheck).toEqual(expectData);
  });

  it('set dataSession whith correct credentials and operation', (): void => {
    const email = component.form.controls['email'];
    const password = component.form.controls['password'];
    const result = component.form.controls['result'];
    component.checkHuman = [2, 3];
    email.setValue('bryan@gmail.com');
    password.setValue('123456');
    result.setValue('5');

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

    authServiceStub.login.and.returnValue(of(mockResultLogin));
    const btnElement = fixture.debugElement.query(By.css('button.btn'));
    btnElement.nativeElement.click();
    expect(component.dataSession).toEqual(mockResultLogin.data);
  });

  it('set ERROR_USER whith incorrect credentials', (): void => {
    const email = component.form.controls['email'];
    const password = component.form.controls['password'];
    const result = component.form.controls['result'];
    component.checkHuman = [2, 3];
    email.setValue('bryan@gmail.com');
    password.setValue('123456789');
    result.setValue('5');

    const mockResultLogin = {
      error: false,
      msg: 'Failed Login',
      data: null,
    };

    authServiceStub.login.and.returnValue(of(mockResultLogin));
    const btnElement = fixture.debugElement.query(By.css('button.btn'));
    btnElement.nativeElement.click();
    expect(component.isCheck).toEqual(`ERROR_USER`);
  });
});
