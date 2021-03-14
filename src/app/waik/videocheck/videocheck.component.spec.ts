import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideocheckComponent } from './videocheck.component';

describe('VideocheckComponent', () => {
  let component: VideocheckComponent;
  let fixture: ComponentFixture<VideocheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideocheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideocheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
