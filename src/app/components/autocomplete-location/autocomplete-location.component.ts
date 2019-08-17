import {
  Component, ViewChild, Input,
  AfterViewInit, forwardRef, Output, EventEmitter
} from '@angular/core';
import {
  Address
} from '../../_models';

// import { Autocomplete } from 'google';
import { IonInput } from '@ionic/angular';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-location',
  templateUrl: './autocomplete-location.component.html',
  styleUrls: ['./autocomplete-location.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteLocationComponent),
      multi: true
    }
  ]
})
// TODO trouver un moyen de ralonger le delay de l'appel à l'api google sinon tout court.
export class AutocompleteLocationComponent implements AfterViewInit, ControlValueAccessor {
  @Input() placeholder: string;

  @ViewChild('locationSearch')
  private locationSearchRef: IonInput;

  @Input('value')
  public get value(): string {
    return this._value;
  }
  public set value(v: string) {
    this._value = v;
    this.onChange(this._value);
    this.onTouched();
  }
  private _value: string;

  @Output() location = new EventEmitter<Address>();

  private _googleAutocomplete: google.maps.places.Autocomplete;

  ngAfterViewInit() {
    this.locationSearchRef.getInputElement().then(
      (ref) => {
        const options = {
          componentRestrictions: { country: 'aus' }
        };
        this._googleAutocomplete = new google.maps.places.Autocomplete(ref, options);

        google.maps.event.addListener(this._googleAutocomplete, 'place_changed', () => {
          const place = this._googleAutocomplete.getPlace();
          const location: Address = {
            name: place.formatted_address,
            location: {
              type: 'Point',
              coordinates: [
                place.geometry.location.lng(),
                place.geometry.location.lat()
              ]
            }
          };
          this.location.emit(location);
          // let formattedAddress = place.formatted_address;
          // let geoJson = place.geometry.location.toJSON();
          console.log(location);
        });
      }
    );
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  onChange: any = () => { };

  onTouched: any = () => { };

  writeValue(obj: any): void {
    this._value = obj;
  }
}
