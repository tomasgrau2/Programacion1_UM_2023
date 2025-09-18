import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspensionMessageComponent } from './suspension-message.component';

describe('SuspensionMessageComponent', () => {
  let component: SuspensionMessageComponent;
  let fixture: ComponentFixture<SuspensionMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspensionMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspensionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
