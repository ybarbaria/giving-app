import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/auth.service';
import { GivesService } from 'src/app/_services/gives.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActionSheetController, Platform, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { Router } from '@angular/router';
// import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Address, Give } from 'src/app/_models';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-create-give',
    templateUrl: 'create-give.page.html',
    styleUrls: ['create-give.page.scss']
})
export class GiveCreatePage implements OnInit {
    give: Give = new Give();
    firstImg: null;
    secondImg: null;
    thirdImg: null;

    options: any;
    imageUrls = []; // todo delete apres tests

    createForm: FormGroup;
    images = [];
    constructor(private formBuilder: FormBuilder,
        private imagePicker: ImagePicker,
        private camera: Camera,
        public dms: DomSanitizer,
        private _giveService: GivesService,
        private _authService: AuthenticationService,
        private _router: Router,
        private file: File,
        private webview: WebView,
        private actionSheetController: ActionSheetController,
        private plt: Platform,
        private loadingController: LoadingController,
        private ref: ChangeDetectorRef,
        private filePath: FilePath) {

        this.give = new Give();
        this.give.user = this._authService.currentUserValue._id;
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

    createGive() {
        this._giveService.create(this.give).subscribe(
            (newGive) => {
                console.log(newGive);
                this._router.navigateByUrl('home');
            },
            (err) => {
                console.log(err);
            }
        );
        // TODO : upload des images et sauvegarde de l'objet give
        // give status moderate
        // adreess provenant de l'autocomplete api google.
    }

    getImages() {
        this.options = {
            // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
            // selection of a single image, the plugin will return it.
            maximumImagesCount: 3,
            // output type, defaults to FILE_URIs.

            // available options are
            // window.imagePicker.OutputType.FILE_URI (0) or
            // window.imagePicker.OutputType.BASE64_STRING (1)
            outputType: 1
        };
        this.imagePicker.getPictures(this.options).then((results) => {
            results.forEach((imgb64) => {
                this.imageUrls.push(this.dms.bypassSecurityTrustUrl('data:image/jpeg;base64,' + imgb64));
            });
        }, (err) => {
            console.log(err);
        });
    }

    getImgCam() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            console.log(imageData);
            const base64Image = 'data:image/jpeg;base64,' + imageData;

            console.log(base64Image);
        }, (err) => {
            console.log(err);
            // Handle error
        });
    }

    locationChanged(location: Address) {
        this.give.address = location.name;
        this.give.location = location.location;
    }
}
