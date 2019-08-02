import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/auth.service';
import { GivesService } from 'src/app/_services/gives.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-give',
    templateUrl: 'create-give.page.html',
    styleUrls: ['create-give.page.scss']
})
export class GiveCreatePage implements OnInit {
    createForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private giveService: GivesService) {
    }

    ngOnInit() {
        this.createForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            category: ['', Validators.required]
        });
    }
}
