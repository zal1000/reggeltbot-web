import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountsearchComponent } from './countsearch.component';

describe('CountsearchComponent', () => {
  let component: CountsearchComponent;
  let fixture: ComponentFixture<CountsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
