import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/auth.service';
import { GivesService } from 'src/app/_services/gives.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActionSheetController, Platform, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
// import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';

import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-create-give',
    templateUrl: 'create-give.page.html',
    styleUrls: ['create-give.page.scss']
})
export class GiveCreatePage implements OnInit {
    createForm: FormGroup;
    images = [];
    constructor(private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private giveService: GivesService,
        private camera: Camera,
        private file: File,
        private webview: WebView,
        private actionSheetController: ActionSheetController,
        private plt: Platform,
        private loadingController: LoadingController,
        private ref: ChangeDetectorRef,
        private filePath: FilePath) {
    }

    ngOnInit() {
        this.createForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            category: ['', Validators.required]
        });
    }

    onSubmit() {

    }

    startUpload() {

    }

    deleteImage() {

    }
}
