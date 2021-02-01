import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotSettingsDialogComponent } from './bot-settings-dialog.component';

describe('BotSettingsDialogComponent', () => {
  let component: BotSettingsDialogComponent;
  let fixture: ComponentFixture<BotSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotSettingsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
