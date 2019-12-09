import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicLoginPageComponent } from './magic-login-page.component';

describe('MagicLoginPageComponent', () => {
  let component: MagicLoginPageComponent;
  let fixture: ComponentFixture<MagicLoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagicLoginPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagicLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
