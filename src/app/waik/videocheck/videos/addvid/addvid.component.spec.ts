import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvidComponent } from './addvid.component';

describe('AddvidComponent', () => {
  let component: AddvidComponent;
  let fixture: ComponentFixture<AddvidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddvidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
