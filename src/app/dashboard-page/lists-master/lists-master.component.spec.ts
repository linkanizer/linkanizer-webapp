import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsMasterComponent } from './lists-master.component';

describe('ListsMasterComponent', () => {
  let component: ListsMasterComponent;
  let fixture: ComponentFixture<ListsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
