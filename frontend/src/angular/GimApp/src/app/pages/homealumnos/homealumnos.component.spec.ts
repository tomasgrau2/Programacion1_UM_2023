import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomealumnosComponent } from './homealumnos.component';

describe('HomealumnosComponent', () => {
  let component: HomealumnosComponent;
  let fixture: ComponentFixture<HomealumnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomealumnosComponent]
    });
    fixture = TestBed.createComponent(HomealumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
