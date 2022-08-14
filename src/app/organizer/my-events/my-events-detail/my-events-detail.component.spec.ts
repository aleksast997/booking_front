import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventsDetailComponent } from './my-events-detail.component';

describe('MyEventsDetailComponent', () => {
  let component: MyEventsDetailComponent;
  let fixture: ComponentFixture<MyEventsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyEventsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEventsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
