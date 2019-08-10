import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/auth.service';
import { LoadingController } from '@ionic/angular';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  loaderToShow: any;
  submitAttempt = false;


  registerForm: FormGroup;
  passwordForm: FormGroup;
  userForm: FormGroup;

  passwordCtrl: FormControl;
  confirmCtrl: FormControl;
  firstNameCtrl: FormControl;
  lastNameCtrl: FormControl;
  emailCtrl: FormControl;

  constructor(private authService: AuthenticationService,
    private router: Router,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder) {

    this.firstNameCtrl = formBuilder.control('', Validators.required);
    this.lastNameCtrl = formBuilder.control('', Validators.required);
    this.emailCtrl = formBuilder.control('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ]);
    this.passwordCtrl = formBuilder.control('', [
      Validators.minLength(6),
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]);
    this.confirmCtrl = formBuilder.control('', [Validators.minLength(6),
    Validators.required,
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]);

    this.passwordForm = formBuilder.group(
      { password: this.passwordCtrl, confirm: this.confirmCtrl },
      { validators: RegisterPage.passwordMatch }
    );
    this.registerForm = formBuilder.group({
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      email: this.emailCtrl,
      passwordForm: this.passwordForm
    });
  }

  static passwordMatch(group: FormGroup) {
    const password = group.get('password').value;
    const confirm = group.get('confirm').value;
    return password === confirm ? null : { matchingError: true };
  }


  ngOnInit() {
  }

  register() {
    this.showLoader();
    const register = new User();
    register.email = this.registerForm.value.email;
    register.firstName = this.registerForm.value.firstName;
    register.lastName = this.registerForm.value.lastName;
    register.password = this.registerForm.value.passwordForm.password;

    this.authService.register(register).subscribe(() => {
      this.hideLoader();
      this.router.navigateByUrl('home');
    });
  }

  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: '',
      translucent: true,
      showBackdrop: false,
      cssClass: 'custom-loader-class'
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    this.hideLoader();
  }

  hideLoader() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 4000);
  }
}
