import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsItemComponent } from './bookings-item.component';

describe('BookingsItemComponent', () => {
  let component: BookingsItemComponent;
  let fixture: ComponentFixture<BookingsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
