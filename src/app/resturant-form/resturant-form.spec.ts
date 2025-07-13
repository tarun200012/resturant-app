import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturantForm } from './resturant-form';

describe('ResturantForm', () => {
  let component: ResturantForm;
  let fixture: ComponentFixture<ResturantForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResturantForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResturantForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
