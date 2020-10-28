import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCandadosComponent } from './tabla-candados.component';

describe('TablaCandadosComponent', () => {
  let component: TablaCandadosComponent;
  let fixture: ComponentFixture<TablaCandadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaCandadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCandadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
