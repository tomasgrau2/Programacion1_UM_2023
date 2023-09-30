import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfeComponent } from './edit-profe.component';

describe('EditProfeComponent', () => {
  let component: EditProfeComponent;
  let fixture: ComponentFixture<EditProfeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfeComponent]
    });
    fixture = TestBed.createComponent(EditProfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
