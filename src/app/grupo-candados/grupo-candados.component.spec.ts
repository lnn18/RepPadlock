import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoCandadosComponent } from './grupo-candados.component';

describe('GrupoCandadosComponent', () => {
  let component: GrupoCandadosComponent;
  let fixture: ComponentFixture<GrupoCandadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoCandadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoCandadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
