import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLibroComponent } from './form-libros.component';

describe('FormLibroComponent', () => {
  let component: FormLibroComponent;
  let fixture: ComponentFixture<FormLibroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormLibroComponent],
    });
    fixture = TestBed.createComponent(FormLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
