import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAlumnoComponent } from './info-alumno.component';

describe('InfoAlumnoComponent', () => {
  let component: InfoAlumnoComponent;
  let fixture: ComponentFixture<InfoAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoAlumnoComponent]
    });
    fixture = TestBed.createComponent(InfoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
