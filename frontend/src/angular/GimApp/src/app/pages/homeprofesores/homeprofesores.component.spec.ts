import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeprofesoresComponent } from './homeprofesores.component';

describe('HomeprofesoresComponent', () => {
  let component: HomeprofesoresComponent;
  let fixture: ComponentFixture<HomeprofesoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeprofesoresComponent]
    });
    fixture = TestBed.createComponent(HomeprofesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
