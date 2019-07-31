import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishPage } from './wish.page';

describe('WishPage', () => {
  let component: WishPage;
  let fixture: ComponentFixture<WishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WishPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
