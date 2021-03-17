import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesListNComponent } from './issues-list-n.component';

describe('IssuesListNComponent', () => {
  let component: IssuesListNComponent;
  let fixture: ComponentFixture<IssuesListNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuesListNComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesListNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
