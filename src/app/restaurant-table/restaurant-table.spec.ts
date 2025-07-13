import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantTable } from './restaurant-table';

describe('RestaurantTable', () => {
  let component: RestaurantTable;
  let fixture: ComponentFixture<RestaurantTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
