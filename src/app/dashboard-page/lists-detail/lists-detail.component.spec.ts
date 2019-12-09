import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsDetailComponent } from './lists-detail.component';

describe('ListsDetailComponent', () => {
  let component: ListsDetailComponent;
  let fixture: ComponentFixture<ListsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
