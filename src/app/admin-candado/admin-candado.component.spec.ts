import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCandadoComponent } from './admin-candado.component';

describe('AdminCandadoComponent', () => {
  let component: AdminCandadoComponent;
  let fixture: ComponentFixture<AdminCandadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCandadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCandadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
