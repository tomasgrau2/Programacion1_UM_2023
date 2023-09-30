import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavProfesorComponent } from './nav-profesor.component';

describe('NavProfesorComponent', () => {
  let component: NavProfesorComponent;
  let fixture: ComponentFixture<NavProfesorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavProfesorComponent]
    });
    fixture = TestBed.createComponent(NavProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
