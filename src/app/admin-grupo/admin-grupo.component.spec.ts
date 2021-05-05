import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGrupoComponent } from './admin-grupo.component';

describe('AdminGrupoComponent', () => {
  let component: AdminGrupoComponent;
  let fixture: ComponentFixture<AdminGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
