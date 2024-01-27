import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDevolucionComponent } from './form-devolucion.component';

describe('FormDevolucionComponent', () => {
  let component: FormDevolucionComponent;
  let fixture: ComponentFixture<FormDevolucionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDevolucionComponent]
    });
    fixture = TestBed.createComponent(FormDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
