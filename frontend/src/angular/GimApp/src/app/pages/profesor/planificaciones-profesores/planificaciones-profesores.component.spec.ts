import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionesProfesoresComponent } from './planificaciones-profesores.component';

describe('PlanificacionesProfesoresComponent', () => {
  let component: PlanificacionesProfesoresComponent;
  let fixture: ComponentFixture<PlanificacionesProfesoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanificacionesProfesoresComponent]
    });
    fixture = TestBed.createComponent(PlanificacionesProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
