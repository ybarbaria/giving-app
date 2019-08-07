import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/auth.service';
import { Facebook } from '@ionic-native/facebook/ngx';

@Component({
    templateUrl: 'login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginComponent implements OnInit {
    returnUrl: string;
    error = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    login(form) {
        this.authenticationService.login(form.value.mail, form.value.password).subscribe((res) => {
            this.router.navigateByUrl(this.returnUrl);
        });
    }

    loginWithFacebook() {
        this.authenticationService.loginWithFacebook().subscribe(
            (res) => {
                this.router.navigateByUrl(this.returnUrl);
            },
            (err) => { console.log(err); }
        );
    }
}
