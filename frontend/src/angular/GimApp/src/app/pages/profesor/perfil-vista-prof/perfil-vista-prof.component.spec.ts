import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilVistaProfComponent } from './perfil-vista-prof.component';

describe('PerfilVistaProfComponent', () => {
  let component: PerfilVistaProfComponent;
  let fixture: ComponentFixture<PerfilVistaProfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilVistaProfComponent]
    });
    fixture = TestBed.createComponent(PerfilVistaProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
