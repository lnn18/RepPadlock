import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCandadoGrupoComponent } from './nuevo-candado-grupo.component';

describe('NuevoCandadoGrupoComponent', () => {
  let component: NuevoCandadoGrupoComponent;
  let fixture: ComponentFixture<NuevoCandadoGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoCandadoGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoCandadoGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
