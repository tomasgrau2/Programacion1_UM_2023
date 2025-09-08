import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionesAdminComponent } from './planificaciones-admin.component';

describe('PlanificacionesAdminComponent', () => {
  let component: PlanificacionesAdminComponent;
  let fixture: ComponentFixture<PlanificacionesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanificacionesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificacionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
