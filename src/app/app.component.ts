import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@data/services/auth.service';
import { DataService } from '@data/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public howEmoji: boolean = false;
  public title = 'Angular Unit Test';
  public contentEmoji = ''
  public dataSession: any;
  public checkHuman: Array<any> = []
  public form: FormGroup = new FormGroup({})
  public isCheck: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      result: ['', [Validators.required]],
    });
    this.checkHuman = this.dataService.generateTwoRandomNumbers(); // Example: [1,2]
  }

  login(): void {
    const [numberA, numberB] = this.checkHuman;
    const result = this.form.value.result
    const check = this.dataService.checkResultOperation(numberA, numberB, result)
    if (!check) {
      this.isCheck = 'ERROR_CHECK'
      return
    }
    this.authService.login(this.form.value).subscribe((r) : void => {
      if(r.data){
        this.dataSession = r.data;
      } else {
        this.isCheck = `ERROR_USER`
      }
    });
  }
}
