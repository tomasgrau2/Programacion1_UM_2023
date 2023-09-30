import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAlumnoComponent } from './crear-alumno.component';

describe('CrearAlumnoComponent', () => {
  let component: CrearAlumnoComponent;
  let fixture: ComponentFixture<CrearAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearAlumnoComponent]
    });
    fixture = TestBed.createComponent(CrearAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
