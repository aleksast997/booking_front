import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventsItemComponent } from './my-events-item.component';

describe('MyEventsItemComponent', () => {
  let component: MyEventsItemComponent;
  let fixture: ComponentFixture<MyEventsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyEventsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEventsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
