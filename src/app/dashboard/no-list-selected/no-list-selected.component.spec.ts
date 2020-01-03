import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoListSelectedComponent } from './no-list-selected.component';

describe('NoListSelectedComponent', () => {
  let component: NoListSelectedComponent;
  let fixture: ComponentFixture<NoListSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoListSelectedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoListSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
