import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCandadosInfoComponent } from './tabla-candados-info.component';

describe('TablaCandadosInfoComponent', () => {
  let component: TablaCandadosInfoComponent;
  let fixture: ComponentFixture<TablaCandadosInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaCandadosInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCandadosInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
